# 10 — Simulação Sob Demanda e Persistência Preguiçosa

## O Problema

Mesmo com cinco camadas de abstração, simular um planeta inteiro continuamente é desperdício. Milhares de entidades em regiões remotas nunca interagem com jogadores.

A solução é **não simular até que seja necessário**.

## Simulação Sob Demanda (Lazy Simulation)

O princípio é simples:

> Uma entidade, região, ou sistema que não está sendo observado não existe em memória como estado contínuo. Quando alguém pergunta por ela, o sistema calcula o estado atual aplicando as regras do jogo ao último estado conhecido + tempo decorrido.

O resultado é **indistinguível** de uma simulação contínua, mas custa uma fração do processamento.

## Camadas de Persistência

| Camada | Nome | O que persiste | Como é consultado |
|--------|------|--------------|-------------------|
| **P1** | **Ativo/Hot** | Estado completo em memória, tick por tick | Regiões com jogadores próximos, combate ativo, economia em crise |
| **P2** | **Adormecido/Warm** | Snapshot a cada 10 minutos + log de eventos relevantes | Regiões que tiveram jogadores recentemente, facções em conflito |
| **P3** | **Congelado/Cold** | Apenas estado-base + seed de simulação + timestamp do último cálculo | Regiões sem interação por horas, naves em trânsito, colônias estáveis |
| **P4** | **Latente/Frozen** | Apenas parâmetros de geração procedural + histórico de eventos passados | Ruínas abandonadas, territórios não-reivindicados, espaço interestelar |

## Como Funciona

### Exemplo 1: Colônia Estável a 200km

**Cenário**: A colônia Beta-7 não tem jogadores há 8 horas. Está operando normalmente.

**Sem simulação sob demanda**: O Servidor NPCs processa 200 NPCs a cada 10 segundos por 8 horas = 576.000 ciclos de IA para produzir... nada relevante.

**Com simulação sob demanda**:
1. Beta-7 está em P3 (Congelado). Último snapshot: 8 horas atrás.
2. Um jogador se aproxima a 50km. O sistema recebe um sinal: "Beta-7 precisa ser consultada".
3. Em vez de simular 8 horas de ticks, o sistema aplica uma **fórmula de resolução em batch**:
   - Produção de cristais = (mineros_ativos * taxa_base * 8h) - (eventos_aleatorios_deterministicos)
   - Suprimentos consumidos = (populacao * consumo_per_capita * 8h)
   - Moral = moral_base - (fator_estresse * horas_sem_reforco)
   - Eventos emergentes = `DeterministicRNG(seed, timestamp_inicial, timestamp_atual, regras_colonia)`
4. O resultado é um novo snapshot: Beta-7 agora tem X cristais, Y suprimentos, Z moral, e 3 eventos ocorridos.
5. Beta-7 é promovida para P2 ou P1, dependendo da distância do jogador.

**A fórmula é determinística**. Dado o mesmo estado-base, seed, e intervalo de tempo, o resultado é sempre idêntico.

### Exemplo 2: Nave Interestelar em Trânsito

**Cenário**: Uma nave de suprimentos partiu de uma estação orbital há 3 dias. Chegaria em V1C5A302-H em 5 dias.

**P4 (Latente)**: A nave não existe como entidade no Servidor Mundo. Existe apenas como registro com origem, destino, partida, chegada_prevista, carga, e seed.

**Quando chega a hora**: O sistema simplesmente verifica `timestamp_atual >= chegada_prevista`. Se sim, a nave é materializada no Servidor Mundo como uma entidade em P1. Eventos no meio do caminho foram determinados pela seed quando a nave foi gerada.

### Exemplo 3: Ninho Mycelion Dormente

**Cenário**: Um ninho Mycelion não foi perturbado em 2 semanas.

**P3 (Congelado)**: O ninho existe apenas como estado-base com força aproximada, castas, expansão acumulada, última perturbação, e seed.

**Quando um jogador chega a 2km**: O sistema calcula:
- Crescimento populacional = `formula_crescimento(castas, 2semanas, seed)`
- Novos túneis escavados = `formula_expansao(expansao_acumulada, 2semanas, seed)`
- Eventos internos = `DeterministicRNG(seed, regras_ninho)`
- O ninho é "descongelado" em P1 com todas as entidades individuais posicionadas consistentemente.

## Fórmulas de Resolução em Batch

| Sistema | Fórmula | Variáveis |
|---------|---------|-----------|
| **Produção de mina** | `miners * taxa_base * delta_t * (1 - fator_acidente(seed))` | Mineradores, taxa base, tempo, eventos determinísticos |
| **Consumo de suprimentos** | `populacao * consumo_per_capita * delta_t * fator_clima(seed)` | População, consumo, tempo, clima |
| **Moral de colônia** | `moral_base - (estresse * delta_t) + (eventos_positivos(seed) * delta_t)` | Moral inicial, estresse, eventos |
| **Crescimento Mycelion** | `populacao_atual * taxa_reproducao * delta_t * fator_limitante(seed)` | População, taxa biológica, recursos |
| **Movimento de naves** | `posicao = origem + (vetor * delta_t)` | Posição, velocidade, tempo |
| **Economia de mercado negro** | `oferta = producao_acumulada(seed); demanda = consumo_acumulado(seed); preco = f(oferta, demanda, volatilidade)` | Produção, consumo, tempo, volatilidade |

## Determinismo e Seed

Toda entidade em P3 ou P4 carrega uma **seed de simulação**:

```
seed = hash(entity_id + timestamp_congelamento + estado_base)
```

Isso garante:
- **Reprodutibilidade**: mesmo estado-base + mesmo tempo = mesmo resultado
- **Debug**: possível "rebobinar" e ver exatamente o que aconteceu
- **Anti-cheat**: servidor pode verificar se o estado calculado está correto
- **Economia de recursos**: nada é computado até ser necessário

## Transição Entre Camadas de Persistência

```
P1 (Ativo) → P2 (Adormecido): 10 minutos sem interação de jogador
P2 (Adormecido) → P3 (Congelado): 1 hora sem interação
P3 (Congelado) → P4 (Latente): 24 horas sem interação + estado estável

P4 (Latente) → P3 (Congelado): Consulta por jogador ou evento global
P3 (Congelado) → P2 (Adormecido): Jogador a 50km
P2 (Adormecido) → P1 (Ativo): Jogador a 2km ou evento de combate
```

Transição **para cima** (descongelamento): via simulação sob demanda.
Transição **para baixo** (congelamento): salvando snapshot + seed.

## O Banco de Dados e as Camadas

| Camada | Onde vive | Formato |
|--------|-----------|---------|
| P1 (Ativo) | Memória RAM do servidor | Objetos de simulação completos |
| P2 (Adormecido) | Memória RAM + Snapshot no banco a cada 10min | Snapshot JSON + log de eventos |
| P3 (Congelado) | Apenas banco de dados | Estado-base compacto + seed + timestamp |
| P4 (Latente) | Banco de dados ou arquivos frios | Parâmetros de geração + histórico de eventos passados |

## Consequência Narrativa

O jogador nunca sabe se uma colônia foi "simulada" ou "calculada". Para ele, o mundo sempre pareceu existir.

Uma mina pode ter fechado porque a fórmula de produção calculou que os suprimentos acabaram. Um soldado pode ter desertado porque a fórmula de moral calculou que ele passou do limite. Um ninho Mycelion pode ter invadido uma colônia porque a fórmula de expansão calculou que eles atingiram capacidade.

**O mundo é um sistema de equações. O jogador é apenas uma variável que entra e sai.**
