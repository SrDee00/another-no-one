# 15 — Mapa Planetário Esférico

## Resumo Executivo

O planeta **V1C5A302-H** não é um plano infinito nem um mapa com bordas. É uma **esfera real**, matematicamente fechada, onde andar em linha reta em qualquer direcao eventualmente retorna ao ponto de origem. Este documento define o modelo geometrico, o sistema de coordenadas, a subdivisao em chunks esfericos e a projecao 2D top-down que torna isso jogavel.

---

## 1. O Problema: Por que uma Esfera Real

Os mapas tradicionais de jogos usam uma das seguintes abordagens:

| Abordagem | Problema para Another No One |
|-----------|------------------------------|
| **Plano infinito** | Nao ha planetas infinitos. Quebra a premissa de colonizacao de um corpo celeste. |
| **Mapa com bordas/invisiveis** | Cria barreiras arbitrarias. O jogador nao pode "dar a volta no planeta". |
| **Wrap em X, borda em Y (cilindro)** | Funciona para um equador, mas pólos nao existem. Geografia fica artificial. |
| **Toroide (wrap X e Y)** | Matematicamente fechado, mas **nao é uma esfera**. Geodésicas nao sao círculos máximos. Distancias nao sao preservadas. |
| **Instancias/carregamento de mapas** | Cria costuras invisíveis. O jogador sabe que está em mapas separados. |

A premissa do jogo exige que **V1C5A302-H seja um planeta**. Isso significa:
- **Topologia esférica**: superfície fechada sem bordas.
- **Geodésicas como círculos máximos**: "andar em linha reta" na superfície segue o menor caminho ao longo de um círculo máximo.
- **Retorno ao início**: qualquer geodésica fechada circunda o planeta e retorna ao ponto de partida.
- **Dois pólos antipodais**: existem dois pontos onde todas as direcoes levam ao mesmo sentido ( Norte / Sul ).
- **Antípoda**: para cada ponto, existe um ponto exatamente oposto na superfície.

---

## 2. Abordagens Avaliadas e Rejeitadas

### 2.1 Toroide (Torus)
Wrap em ambos os eixos. Matematicamente simples.
- **Rejeitada**: curvatura gaussiana zero (plano dobrado). Geodésicas nao sao círculos máximos. Um jogador andando em "linha reta" nao descreve um círculo máximo. Ha duas famílias de circulos geodésicos independentes. **Nao é uma esfera.**

### 2.2 Projeção Equiretangular (Lat/Lon com Wrap)
Wrap apenas em longitude (X). Latitude (Y) é limitada a [-90, +90].
- **Rejeitada**: os pólos sao singularidades. Chegar ao polo Norte significa que **todas as direcoes passam a ser Sul**. Isso quebra a sensacao de "andar em qualquer direcao continuamente". Além disso, a projecao distorce fortemente nas latitudes altas.

### 2.3 Cube Map / Multi-face
Projeta a esfera nas 6 faces de um cubo. Cada face é um plano 2D.
- **Rejeitada para top-down**: embora topologicamente correta, a transicao entre faces é complicada em perspectiva top-down. O jogador perceberia costuras na orientacao (norte muda de direcao ao cruzar uma aresta). Requer um cliente que entenda multi-face, o que complica a camada grafica indiferente.

### 2.4 Icosaedro Geodésico / Hex Grid Esférico
Divide a esfera em tiles hexagonais/pentagonais.
- **Rejeitada para movimento continuo**: excelente para jogos por turnos ou estratégia em tiles, mas movimento em tempo real top-down em tiles esfericos exige recalcular geodésicas a cada frame. Além disso, renderizacao de sprites em tiles curvos é visualmente estranha.

---

## 3. Solucao Recomendada: Esfera de Referência Interna + Projecao Local Tangente

A abordagem escolhida é híbrida:

1. **Servidor**: opera em coordenadas 3D cartesianas na superfície de uma esfera.
2. **Cliente**: recebe coordenadas absolutas e projeta uma regiao local em um plano 2D tangente ao ponto da câmera.

Isso significa:
- O **Servidor Mundo** nao sabe que existe grafico. Ele apenas move entidades ao longo de geodésicas em coordenadas 3D.
- O **cliente render** vê um plano 2D perfeitamente normal. A curvatura é invisível em escala tática.
- Em mapas globais (nível 3/4), o cliente pode renderizar uma projecao esférica (ex: ortográfica) para visualizar o planeta inteiro.

### Vantagens

| Vantagem | Explicacao |
|----------|------------|
| **Esfera matematicamente real** | Geodésicas sao círculos máximos. Andar em linha reta volta ao início. |
| **Sem bordas, sem costuras** | A superfície é continua e fechada. Nao ha "borda do mapa". |
| **Distancia real** | Distancias sao arcos de círculo máximo (haversine). |
| **Compatível com arquitetura existente** | O servidor continua agnóstico a graficos. Apenas adiciona uma dimensao Z às coordenadas. |
| **Escalável com camadas** | Chunks esfericos funcionam com as 5 camadas de simulação. |
| **Render 2D top-down intacto** | O jogador nunca "sente" a esfera em gameplay tático. |

---

## 4. Modelo Matemático Formal

### 4.1 Definicoes

- **Raio do planeta**: `R` (configurável, ver Secao 10)
- **Centro do planeta**: origem `(0, 0, 0)`
- **Eixo Norte-Sul**: eixo Y positivo = Polo Norte
- **Plano Equatorial**: plano XZ (Y = 0)
- **Meridiano de referência**: plano XY (Z = 0), X positivo = referência de longitude 0

### 4.2 Coordenadas Cartesianas Esféricas

Cada entidade armazena um vetor posicao `P` na superfície da esfera:

```
P = (Px, Py, Pz)  onde  |P| = R
```

Ou, para evitar drift numérico, armazena um vetor unitario `p` e o raio `R` separadamente:

```
p = (px, py, pz)  onde  |p| = 1
P = p * R
```

**Vantagem do vetor unitario**: após muitas operacoes de movimento, o vetor pode sair da superfície por erro de ponto flutuante. Normalizar `p = p / |p|` o forca de volta à esfera.

### 4.3 Coordenadas Geograficas (Lat/Lon)

Conversao cartesiano -> geografico (para referência humana, mapas globais, logs):

```
latitude  = arcsin(py)           -- em radianos, [-pi/2, +pi/2]
longitude = atan2(pz, px)        -- em radianos, [-pi, +pi]
```

Conversao geografico -> cartesiano:

```
px = cos(latitude) * cos(longitude)
py = sin(latitude)
pz = cos(latitude) * sin(longitude)
```

**Importante**: Lat/Lon sao usados apenas para referência humana, nomes de regioes, e mapas globais. O servidor opera em cartesianas 3D.

### 4.4 Direcao e Orientacao

A direcao de movimento de uma entidade é um vetor tangente `D` ao ponto `P`, ou seja:

```
D · P = 0   (ortogonal ao raio)
|D| = 1     (unitario)
```

O "Norte" local de uma entidade é definido como o vetor tangente apontando para o polo Norte. Dado o vetor posicao `p`, o Norte local `N` é:

```
N = normalize( (0, 1, 0) - py * p )
```

Isso projeta o vetor global (0,1,0) no plano tangente em `p`. Nos pólos, o Norte é definido arbitrariamente como apontando para longitude 0.

O "Leste" local `E` é perpendicular a ambos:

```
E = normalize( N × p )
```

Assim, `(N, E, p)` forma uma base ortonormal local (direita, para frente, normal).

### 4.5 Movimento ao Longo de uma Geodésica (Circulo Máximo)

**Teorema**: A geodésica em uma esfera é um arco de círculo máximo, obtido rotacionando o vetor posicao ao redor do eixo perpendicular ao plano do movimento.

Dado:
- Posicao atual: `p` (unitario)
- Direcao: `d` (unitario, tangente)
- Distancia a percorrer: `s` (em metros)

A nova posicao `p'` é:

```
p' = p * cos(s / R) + d * sin(s / R)
```

A nova direcao (paralelo transportado) `d'` é:

```
d' = -p * sin(s / R) + d * cos(s / R)
```

**Prova de que volta ao início**: Se `s = 2 * pi * R` (circunferencia), entao `s/R = 2*pi`, e:
```
p' = p * cos(2*pi) + d * sin(2*pi) = p * 1 + d * 0 = p
```
A entidade retorna exatamente ao ponto de origem. Isso vale para **qualquer** direcao `d`.

**Prova de que é um circulo**: Os vetores `p`, `d`, e `p'` permanecem no mesmo plano bidimensional (o plano do círculo máximo). A trajetória é a intersecao desse plano com a esfera.

### 4.6 Distancia entre Duas Entidades

Dados `p1` e `p2` (unitarios), a distancia de arco `s` entre eles é:

```
cos_theta = clamp(p1 · p2, -1, 1)    -- produto escalar
s = R * arccos(cos_theta)
```

Para estabilidade numérica quando `p1 ≈ p2`, use a fórmula do ângulo entre vetores via `atan2`:

```
theta = atan2(|p1 × p2|, p1 · p2)
s = R * theta
```

---

## 5. Subdivisao em Chunks Esfericos

### 5.1 O Sistema de Chunks

O planeta é dividido em **chunks esfericos** para simulacao, persistencia e streaming. Um chunk é uma regiao da superfície esférica com identificador único.

**Abordagem escolhida: Grade Lat/Lon adaptada com caps polares**

A esfera é dividida em:
- **Zona equatorial**: grade retangular de latitudes e longitudes (quadriláteros esfericos)
- **Cap polar Norte**: pirâmide de chunks triangulares convergindo ao polo
- **Cap polar Sul**: pirâmide de chunks triangulares convergindo ao polo

Isso evita a singularidade de um unico ponto no polo enquanto mantém chunks de área aproximadamente igual.

### 5.2 Parametros da Grade

| Parametro | Significado | Valor sugerido |
|-----------|-------------|----------------|
| `N_lat` | Numero de divisoes de latitude (excluindo caps) | 180 |
| `N_lon` | Numero de divisoes de longitude | 360 |
| `cap_size` | Extensao angular de cada cap polar | 5 graus (~55 km no raio padrao) |
| `chunk_lat` | Tamanho angular de um chunk em latitude | 1 grau |
| `chunk_lon` | Tamanho angular de um chunk em longitude | 1 grau |

**Tamanho fisico de um chunk** (na equador, raio R = 300 km):
- Largura: `R * (pi/180) ≈ 300.000 * 0.01745 ≈ 5.236 metros`
- Altura: igual (a grade é quadrada na equador)
- Área: ~27.400 m² (~5.2 km de lado)

Isso pode ser muito grande ou muito pequeno dependendo do gameplay. Para um jogo tático, chunks de ~100m a ~500m podem ser mais apropriados.

**Parametros reajustados**:

| Parametro | Valor sugerido para V1C5A302-H |
|-----------|-------------------------------|
| `N_lat` | 1800 (0.1 grau por chunk) |
| `N_lon` | 3600 (0.1 grau por chunk) |
| `cap_size` | 0.5 graus |
| **Tamanho do chunk na equador** | ~523 metros |
| **Numero total de chunks** | ~3.240.000 + caps |

Isso é gerenciável com as camadas de simulacao: a maioria dos chunks está em Nível 4 (abstraido).

### 5.3 Identificacao de Chunk

Cada chunk tem um ID esférico:

```json
{
  "level": 1,           -- nível de resolucao (1 = mais fino)
  "type": "equatorial", -- "equatorial", "cap_north", "cap_south"
  "lat_idx": 450,       -- indice de latitude
  "lon_idx": 1200,    -- indice de longitude
  "layer": 1            -- camada de simulacao atual
}
```

**Determinacao do chunk de uma entidade**:

```
lat = arcsin(py)
lon = atan2(pz, px)
lat_idx = floor((lat + pi/2) / chunk_lat_size)
lon_idx = floor((lon + pi) / chunk_lon_size) mod N_lon
```

### 5.4 Chunks Vizinhos

Para chunks equatoriais, os vizinhos são simples:
- Norte: `(lat_idx + 1, lon_idx)`
- Sul: `(lat_idx - 1, lon_idx)`
- Leste: `(lat_idx, (lon_idx + 1) mod N_lon)`
- Oeste: `(lat_idx, (lon_idx - 1 + N_lon) mod N_lon)`

Nos caps polares, os vizinhos sao triangulares e convergem.

### 5.5 Multi-Resolucao e Camadas de Simulacao

Cada camada de simulacao (Nível 1–5) opera com uma resolucao de chunk diferente:

| Camada | Resolucao de chunk | Numero de chunks | O que representa |
|--------|-------------------|------------------|----------------|
| Nível 1 (Micro) | 0.1° x 0.1° (~523m) | ~3.2M | Entidades individuais, colisoes, combate |
| Nível 2 (Meso) | 1° x 1° (~5.2km) | ~32.400 | Grupos de pelotao, estatisticas agregadas |
| Nível 3 (Macro) | 10° x 10° (~52km) | ~324 | Colonias, minas, rotas de suprimentos |
| Nível 4 (Global) | 30° x 30° (~157km) | ~36 | Naves, balanco corporativo, expansao Mycelion |
| Nível 5 (Arquivado) | 90° x 90° | ~6 | Regioes continentais, historico |

**Promocao/Democao**: Quando um jogador se aproxima, um chunk de Nível 2 é "demolido" em 100 chunks de Nível 1 (10x10). O inverso ocorre quando o jogador se afasta.

---

## 6. Renderizacao 2D Top-Down

### 6.1 Principio

O cliente nao renderiza a esfera. Ele renderiza um **plano tangente local** à esfera no ponto onde a câmera está.

A projecao é **ortografica local**: projeta-se cada entidade próxima no plano tangente e desenha-se em 2D.

### 6.2 Matematica da Projecao

Dado:
- Ponto da câmera (centro da tela): `c` (unitario)
- Norte local: `N = normalize((0,1,0) - cy * c)`
- Leste local: `E = normalize(N × c)`
- Altura da câmera acima da superfície: `h` (geralmente 0 para top-down puro, ou pequeno para perspectiva leve)

Para cada entidade com posicao `p` (unitario):

1. **Vetor diferenca**: `v = p - c`
2. **Componente normal**: `v_n = (v · c) * c`
3. **Projecao no plano tangente**: `v_t = v - v_n`
4. **Coordenadas 2D**:
   ```
   x_2d = v_t · E     -- leste = direita na tela
   y_2d = v_t · N     -- norte = cima na tela
   ```

**Observacao**: Se a câmera está exatamente na superfície (`h = 0`) e o jogador está no centro, `v_t = 0` para a entidade da câmera. Entidades ao redor têm `v_t` proporcional à distancia de arco.

### 6.3 Limites de Projecao (Clipping)

A projecao ortografica local funciona bem apenas para entidades dentro de uma distancia angular `theta_max`. Além disso:
- A projecao começa a distorcer significativamente.
- Entidades do outro lado do planeta nao devem ser renderizadas.

**Distancia maxima de renderizacao**:
```
theta_max = 30 graus (pi/6 radianos)
s_max = R * pi/6
```

Para R = 300 km: `s_max ≈ 157 km`. Isso é mais do que suficiente para renderizacao tática (o horizonte visual está a ~1.3 km devido à curvatura, mas em top-down 2D sem atmosfera, podemos renderizar mais).

**Nota**: Em um jogo 2D top-down puro, o "horizonte" não é um fator visual como em first-person. Podemos usar um `theta_max` maior, como 60 graus, o que dá `s_max ≈ 314 km`.

### 6.4 Orientacao do Sprite

A orientacao de uma entidade na tela 2D é calculada projetando sua direcao `d` no plano tangente:

```
d_t = d - (d · c) * c   -- remove componente normal
angle = atan2(d_t · N, d_t · E)   -- angulo em relacao ao leste
```

O sprite é rotacionado por esse angulo.

**Correcao de orientacao em longas distancias**: quando uma entidade está longe da câmera, o "Norte" local dela nao é paralelo ao Norte local da câmera. A projecao acima corrige isso automaticamente, pois projeta a direcao local dela no plano tangente da câmera.

### 6.5 Mapa Global (Minimapa / Nível 3/4)

Para mapas globais, o cliente usa uma projecao esférica diferente:
- **Projecao ortografica**: mostra um hemisfério como um disco, visto de um ponto no espaco. Útil para visualizar uma face do planeta.
- **Projecao equiretangular**: lat/lon como X/Y, para visualizacao de todo o planeta em retângulo (com distorcao nos pólos aceitável para UI).
- **Projecao de azimute equidistante**: distancias a partir de um ponto central sao preservadas. Útil para mapas táticos de alcance de rádio.

O cliente escolhe a projecao conforme o zoom e o contexto.

---

## 7. Integracao com a Arquitetura de Servidor

### 7.1 Protocolo de Estado (atualizado)

O Servidor Mundo agora emite posicoes 3D em vez de 2D:

```json
{
  "tick": 1847293,
  "origin": "world",
  "entity_id": "uuid",
  "type": "state_update",
  "payload": {
    "position": { "x": 127500.0, "y": 234800.0, "z": -89100.0 },
    "direction": { "x": 0.12, "y": -0.45, "z": 0.88 },
    "velocity": 2.5,
    "orientation_angle": 1.234
  }
}
```

O campo `position` é um vetor cartesiano 3D. O cliente calcula a projecao 2D local.

**Nota de compatibilidade**: Clientes antigos que ainda esperam (x, y) podem receber uma projecao lat/lon planar como fallback, mas isso é deprecado.

### 7.2 Fisica e Colisoes

A fisica do Servidor Mundo opera em coordenadas 3D esfericas:

**Movimento**: Toda entidade que se move usa a fórmula de geodésica (Secao 4.5). Velocidade `v` (m/s) é convertida em arco por tick:
```
s = v * delta_t
p_next = p * cos(s/R) + d * sin(s/R)
d_next = -p * sin(s/R) + d * cos(s/R)
```

**Colisoes**: Duas entidades colidem se a distancia de arco entre elas for menor que a soma de seus raios:
```
dist = R * atan2(|p1 × p2|, p1 · p2)
colisao = dist < (r1 + r2)
```

**Balística**: Projetis movem-se ao longo de geodésicas com velocidade propria. Gravidade do planeta pode causar uma queda sutil (o projétil nao segue exatamente uma geodésica, mas uma trajetória balística ligeiramente abaixo). Para simplificacao inicial, balística segue geodésicas puras.

**Terreno**: O mapa de altura é uma funcao `h(lat, lon)` que da a elevacao acima do raio `R`. A superfície efetiva tem raio `R + h`. Geodésicas seguem a superfície topografica (simplificacao: geodésicas em `R` constante, com colisoes verificadas contra o terreno).

### 7.3 Clima e Ecologia

Tempestades, ciclos climaticos e migracao de fauna sao naturais em uma esfera:
- Sistemas meteorológicos movem-se como celulas na superfície esférica.
- Correntes de vento seguem geodésicas.
- Dias/noites de 72h sao explicados pela rotacao da esfera (periodo de rotacao configurável).

---

## 8. Sincronizacao e Ticks

### 8.1 Tick de Mecânicas (10s)

Para cada entidade em movimento no tick:
1. Calcula `s = velocidade * 10`
2. Atualiza `p` e `d` via geodésica
3. Determina novo chunk esferico
4. Se mudou de chunk: notifica gerenciador de chunks para promocao/democao

### 8.2 Tick de Persistencia (10min)

O estado completo do planeta é salvo como:
- Coordenadas cartesianas de todas as entidades Nível 1
- Seeds de democao para entidades Nível 2+
- Estado de chunks esfericos (terreno modificado, estruturas)

O arquivo de save é ~10-50 MB por shard, dependendo do numero de entidades.

### 8.3 Reconexao e Resumo

Quando um jogador reconecta:
1. Servidor calcula chunk atual do personagem
2. Envia estado Nível 1 para chunks dentro de 2km
3. Envia estado Nível 2 para regioes dentro de 20km
4. Envia estado Nível 3 para outras colonias
5. Envia estado Nível 4 para balanco planetário

O cliente recebe coordenadas 3D e projeta localmente.

---

## 9. Camadas de Simulacao e a Esfera

As 5 camadas de simulacao (doc 09) mapeiam-se naturalmente para a esfera:

| Camada | Abstracao na Esfera | Exemplo |
|--------|---------------------|---------|
| Nível 1 | Chunks individuais (0.1°) | Soldado em patrulha, tiro, colisao |
| Nível 2 | Agregacoes de 10x10 chunks (1°) | Pelotao de 30 soldados, estatisticas |
| Nível 3 | Setores de 10° x 10° | Colonia FNA-01, Mina Alpha, rotas |
| Nível 4 | Hemisférios / aneis de latitude | Chegada de naves, expansao Mycelion planetária |
| Nível 5 | Esfera inteira (arquivo) | Historico de guerras, ruínas, terreno modificado |

**Promocao**: Um jogador chegando a um setor Nível 3 dispara a geracao determinística de chunks Nível 2 e Nível 1 naquele setor.

**Democao**: Quando todos os jogadores saem de um setor, os chunks Nível 1 sao agregados em estatísticas Nível 2 e descartados.

---

## 10. Parametros do Planeta V1C5A302-H

### 10.1 Dimensoes Fisicas

| Parametro | Valor | Notas |
|-----------|-------|-------|
| **Raio medio** | 287.5 km | Aproximadamente o tamanho de Ceres (planeta-anão). Grande o suficiente para esquecer a curvatura em escala tática, pequeno o suficiente para permitir viagens planetárias viáveis. |
| **Circunferencia** | ~1.806 km | Um jogador a pé (~5 km/h) levaria ~15 dias para dar a volta. Com veículo (~50 km/h), ~1.5 dias. |
| **Area superficial** | ~1.038.000 km² | Aproximadamente a área do Egito. |
| **Gravidade** | 1.3g | Densidade maior que a Terra (documento 02). |
| **Periodo de rotacao** | 144 horas terrestres | Gera dias de 72h e noites de 72h (documento 02). |

### 10.2 Justificativa do Raio

Um raio de ~287.5 km foi escolhido deliberadamente para criar tensao de escala:
- **Em escala tática** (até 2km): a curvatura é imperceptível. O jogador vê um plano.
- **Em escala operacional** (até 50km): a curvatura começa a importar para rádio, balística de longo alcance, e linha de visao.
- **Em escala estratégica** (planetária): o planeta é grande o suficiente para ter misterio, mas pequeno o suficiente para que eventos em uma colônia afetem outra em tempo de gameplay.
- **Em escala narrativa**: dar a volta no planeta é uma facanha, nao impossível.

**Comparacao**:
- Lua: raio 1.737 km (muito grande, viagem de meses a pé)
- Ceres: raio 469 km (bom, mas ainda grande)
- 287.5 km: circunferência ~1.800 km. Dois extremos antipodais estão a ~900 km. Uma nave de suprimentos a 200 km/h cruza em ~4.5h.

### 10.3 Configurabilidade

O raio é um parametro do mundo. Para testes ou shards menores, pode ser reduzido para 50 km. Para simulacoes de escala interestelar, pode ser aumentado. A matemática da esfera é invariante ao raio.

---

## 11. Provas e Validacao

### 11.1 Teste: Circulacao Completa

```python
def test_circulacao_completa():
    p = Vector3(1, 0, 0)  -- ponto no equador
    d = Vector3(0, 1, 0)  -- direcao norte (nao, isso nao é tangente...)
    
    # Correcao: no equador, norte é (0,1,0), que é tangente
    p = normalize(1, 0, 0)
    d = normalize(0, 1, 0)
    
    # Andar 1/4 da circunferencia -> polo norte
    s = (2 * pi * R) / 4
    p1 = p * cos(s/R) + d * sin(s/R)
    assert proximo(p1, (0, 1, 0))  -- polo norte
    
    # Andar mais 1/4 -> equador oposto
    p2 = p1 * cos(s/R) + d1 * sin(s/R)
    # ... continua ate voltar
    
    # Andar circunferencia completa
    s_full = 2 * pi * R
    p_final = p * cos(s_full/R) + d * sin(s_full/R)
    assert proximo(p_final, p)  -- exatamente onde começou
```

### 11.2 Teste: Geodésica em Qualquer Direcao

```python
def test_geodesica_aleatoria():
    for _ in range(1000):
        p = ponto_aleatorio_na_esfera()
        d = direcao_tangente_aleatoria(p)
        s = 2 * pi * R
        p_final = move_geodesica(p, d, s)
        assert distancia(p, p_final) < 1e-6  -- voltou ao inicio
```

### 11.3 Teste: Antípoda

```python
def test_antipoda():
    p = ponto_aleatorio_na_esfera()
    p_antipoda = -p  -- exatamente oposto
    s = pi * R       -- metade da circunferencia
    p_meio = move_geodesica(p, d, s)
    assert proximo(p_meio, p_antipoda)  -- ou proximo de algum ponto na geodesica
```

### 11.4 Teste: Consistencia de Chunks

```python
def test_chunk_idempotente():
    p = ponto_aleatorio_na_esfera()
    chunk = chunk_de_ponto(p)
    # Recalcular a partir do centro do chunk deve dar o mesmo chunk
    p_centro = centro_do_chunk(chunk)
    chunk2 = chunk_de_ponto(p_centro)
    assert chunk == chunk2
```

---

## 12. Referencias de Implementacao

### 12.1 Estruturas de Dados

```json
// Entidade no Servidor Mundo
{
  "entity_id": "uuid",
  "position_sphere": { "x": 0.433, "y": 0.75, "z": -0.5 },  // vetor unitario
  "direction_tangent": { "x": -0.65, "y": 0.3, "z": 0.7 },   // vetor tangente unitario
  "radius_offset": 2.5,  // metros acima da superfície (altura do terreno + elevacao)
  "chunk_id": { "level": 1, "lat_idx": 450, "lon_idx": 1200 }
}
```

### 12.2 Pseudocodigo do Servidor Mundo (Tick)

```
function TickMecanicas(delta_t):
    for entidade in entidades_ativas_nivel1:
        if entidade.velocidade > 0:
            s = entidade.velocidade * delta_t
            p = entidade.posicao
            d = entidade.direcao
            
            # Move ao longo da geodésica
            p_new = p * cos(s/R) + d * sin(s/R)
            d_new = -p * sin(s/R) + d * cos(s/R)
            
            # Normaliza para evitar drift
            p_new = normalize(p_new)
            d_new = normalize(d_new - dot(d_new, p_new) * p_new)
            
            entidade.posicao = p_new
            entidade.direcao = d_new
            
            # Verifica chunk
            chunk_novo = chunk_de_ponto(p_new)
            if chunk_novo != entidade.chunk_id:
                migrar_entidade(entidade, chunk_novo)
                
        # Colisoes: verifica contra entidades no mesmo chunk e vizinhos
        for outra in entidades_proximas(entidade):
            if distancia_arco(entidade.posicao, outra.posicao) < (entidade.raio + outra.raio):
                resolver_colisao(entidade, outra)
```

### 12.3 Pseudocodigo do Cliente Render (Projecao)

```
function RenderFrame():
    c = camera.posicao  // vetor unitario na esfera
    N = norte_local(c)
    E = leste_local(c)
    
    for entidade in entidades_recebidas:
        p = entidade.posicao
        v = p - c
        v_t = v - dot(v, c) * c
        
        x_screen = dot(v_t, E) * zoom + centro_x
        y_screen = -dot(v_t, N) * zoom + centro_y  // Y invertido para tela
        
        if entidade dentro da tela:
            desenhar_sprite(entidade.sprite, x_screen, y_screen, entidade.angulo)
```

### 12.4 Bibliotecas e Referencias

- **HEALPix** (NASA/ESA): sistema hierárquico de pixels esfericos de área igual. Útil para chunks de resolucao variável.
- **S2 Geometry** (Google): biblioteca para indexacao espacial em esferas. Útil para queries de proximidade.
- **GeographicLib** (Charles Karney): implementacao de geodésicas em esferas e elipsoides.
- **"Quaternions and Rotation Sequences"** (Kuipers): para rotação de geodésicas sem singularidades.

---

## 13. Consideracoes Futuras

### 13.1 Topografia Real

A superfície atual é uma esfera perfeita. Em implementacoes futuras, o raio `R` pode variar localmente como `R(lat, lon) = R_base + elevacao(lat, lon)`, criando montanhas e vales. Geodésicas seguiriam a superfície topografica (geodésicas em uma variedade 2D com métrica local).

### 13.2 Atmosfera e Horizonte

Com raio 287.5 km, o horizonte para um observador a 2m de altura está a aproximadamente:
```
d = sqrt(2 * R * h) = sqrt(2 * 287500 * 2) ≈ 1.072 metros
```

Isso significa que o horizonte está a ~1 km. Em um jogo top-down 2D, isso nao é um fator visual, mas afeta:
- **Radio**: alcance de transmissao de radio é limitado pela linha de visao (horizonte + atmosfera).
- **Balística**: armas de longo alcance precisam considerar a curvatura.
- **Radar**: deteccao a distancia é limitada pelo horizonte.

### 13.3 Multiplos Biomas e Zonas Climáticas

A esfera permite biomas baseados em latitude:
- **Equador**: quente, tempestades elétricas intensas
- **Latitudes medias**: zona de colonizacao (FNA-01)
- **Polos**: frio extremo, cristais de fase expostos, Mycelion ativo (hipotese: frio acelera crescimento do fungo)

---

*Documento técnico. Vinculado a: 02-world.md, 06-render.md, 07-server-architecture.md, 09-simulation-layers.md*

*Última atualização: 2026-05-27*
