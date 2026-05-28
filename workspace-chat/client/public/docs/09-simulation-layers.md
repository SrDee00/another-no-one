# 09 — Camadas de Abstração e Níveis de Simulação

## O Problema

É impossível simular cada soldado, cada tiro, cada bala, cada feromônio, cada transação comercial, e cada célula de Mycelion em todo o planeta, o tempo todo. V1C5A302-H é um mundo. Um mundo requer **escala**.

A solução é **abstração por proximidade e relevância**: entidades são simuladas com o nível de detalhe que sua situação exige.

## As Cinco Camadas de Simulação

| Camada | Nome | Granularidade | O que simula | Tick |
|--------|------|---------------|--------------|------|
| **Nível 1** | **Micro/Tático** | Entidade individual | Posição exata, colisão, balística, combate corpo-a-corpo, interação com terreno, ferimentos locais | 10s |
| **Nível 2** | **Meso/Tático Agregado** | Grupo de 5-50 entidades | Coordenadas aproximadas, estatísticas agregadas (moral, munição, saúde média), ações em lote, resolução simplificada de combate | 10s |
| **Nível 3** | **Macro/Regional** | Facção ou Instalação | Produção de minas, estado de colônias, movimento de comboios entre regiões, saldo de forças em um setor, relações diplomáticas | 5-15min |
| **Nível 4** | **Global/Planetário** | Planeta como sistema | Chegada de naves, balanço corporativo da AES, eventos climáticos globais, expansão Mycelion planetária, rotas interestelares | 30min-1h |
| **Nível 5** | **Arquivado** | Eventos passados | Registros históricos, memórias de NPCs mortos, territórios abandonados, ruínas | Não simula, apenas registra |

## Promoção e Demosião

Entidades mudam de camada de abstração dinamicamente, dependendo de onde os jogadores estão e do que está acontecendo:

### Promoção (Demolição de Abstração)
Quando um jogador se aproxima de uma entidade abstrata, ela é "demolido" em entidades individuais:
- Um pelotão de 30 soldados (Nível 2) se torna 30 soldados com nomes, posições, inventários (Nível 1)
- Uma mina (Nível 3) se torna corredores, mineradores, máquinas, guardas (Nível 1)
- Um ninho Mycelion (Nível 2) se torna castas individuais em túneis (Nível 1)

O processo é **determinístico e reproduzível**: dado o estado da entidade abstrata e uma seed, a demolição sempre gera as mesmas entidades individuais.

### Demosião (Abstração de Agregação)
Quando nenhum jogador está próximo e não há eventos ativos, entidades individuais são "promovidas" para abstrações:
- 30 soldados patrulhando uma área segura se tornam um único registro de pelotão com estatísticas agregadas
- Um ninho Mycelion sem atividade recente se torna um ponto no mapa com força aproximada
- Uma colônia inteira pode operar como uma fábrica de números enquanto ninguém está lá

### Critérios de Promoção/Demosião

| Critério | Promoção (Detalhe) | Demosião (Abstração) |
|----------|-------------------|----------------------|
| **Distância a jogadores** | < 2km de qualquer jogador conectado | > 5km de todos os jogadores |
| **Atividade de combate** | Em combate nos últimos 3 ticks | Sem combate nos últimos 10 ticks |
| **Interação relevante** | Interagiu com entidade do jogador | Sem interação relevante por 1 hora |
| **Evento narrativo** | NPC importante morre, colônia é atacada, descoberta científica | Evento resolvido, consequências estabilizadas |
| **Economia crítica** | Instalação em colapso financeiro | Operação normal |

## Fatias de Abstração (Abstraction Slices)

O Servidor Mundo não opera em uma única camada. Ele opera em **fatias simultâneas**:

- **Nível 1**: Jogador + entidades próximas (~200 entidades individuais)
- **Nível 2**: Região adjacente (5km-20km, ~15 grupos agregados)
- **Nível 3**: Outras colônias no planeta (~7 instalações como registros econômicos)
- **Nível 4**: Planeta como sistema orbital (naves, balanço AES, expansão Mycelion)
- **Nível 5**: Passado arquivado (registros de mortes, traições, ruínas, terreno modificado)

## Algoritmo de Decisão de Camada

```
function DeterminarCamada(entidade):
    if entidade.morto:
        return Nível 5 (arquivado)
    
    if entidade.em_combate_ativo:
        return Nível 1 (micro)
    
    distancia_jogador = MinimaDistanciaParaQualquerJogador(entidade)
    
    if distancia_jogador < 2000m:
        return Nível 1 (micro)
    
    if distancia_jogador < 10000m:
        return Nível 2 (meso)
    
    if entidade.tipo == "colonia" ou entidade.tipo == "ninho":
        return Nível 3 (macro)
    
    if entidade.tipo == "nave" ou entidade.tipo == "corporacao":
        return Nível 4 (global)
    
    return Nível 2 (meso) -- default para entidades ativas longe
```

## Consequências Práticas

- **Performance**: O Servidor Mundo processa ~200-500 entidades em Nível 1 e ~10.000 entidades em Níveis 2-4 por tick.
- **Escalabilidade**: Novos jogadores conectando-se não sobrecarregam o servidor, apenas "promovem" mais entidades para Nível 1 temporariamente.
- **Narrativa**: Um jogador pode viajar 50km e encontrar uma colônia destruída que, 2 horas atrás, era apenas um número em Nível 3.
- **Exploração**: Áreas remotas do planeta podem ter surpresas geradas em Nível 3 e só "demolidas" quando um jogador chega. Isso é procedural e determinístico.

## Persistência por Camada

| Camada | Persistido como | Quando salva |
|--------|--------------|-------------|
| Nível 1 | Estado completo de cada entidade (posição, inventário, saúde, memórias) | Cada tick de persistência (10min) |
| Nível 2 | Estado agregado do grupo + seed de demolição | Cada tick de persistência |
| Nível 3 | Registros econômicos e políticos da instalação | Cada tick de economia local (5min) |
| Nível 4 | Estado planetário (naves, corporação, ecologia global) | Cada tick de economia global (30min) |
| Nível 5 | Logs de eventos, terreno modificado, NPCs mortos | Após resolução de evento |

## O Jogador e a Abstração

O jogador vive quase sempre em **Nível 1**. Ele vê cada tiro, cada passo, cada NPC.

Mas também interage com abstrações:
- O mapa mostra movimento de forças em Nível 2 como ícones de pelotão
- Relatórios de colônias distantes (Nível 3) chegam por rádio
- Decisões da AES (Nível 4) afetam reforços e orçamento
- O histórico de batalhas (Nível 5) é consultável em terminais

**A revelação**: Quando um jogador morre em Nível 1, sua morte é imediatamente arquivada em Nível 5. Outro jogador pode, horas depois, ler um relatório resumido sobre "baixa #4472, setor G" sem jamais saber que #4472 era um jogador. Para o sistema, não havia diferença.

**Another No One.**
