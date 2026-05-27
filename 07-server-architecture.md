# 07 — Arquitetura de Servidor

## Visão Geral

```
┌──────────────────────────────────────────────┐
│              CLIENTE (Render Layer)           │
│        2D Top-Down / Input / UI / Áudio      │
│   Recebe ESTADO do mundo → desenha PIXELS    │
│   Envia INTENÇÕES → Gateway                  │
└──────────────────────┬───────────────────────┘
                       │  Protocolo de Estado
                       │  Protocolo de Intenção
┌──────────────────────▼───────────────────────┐
│           GATEWAY / ORQUESTRADOR            │
│   (roteamento, autenticação, matchmaking,   │
│    broadcast de estado, delta compression,  │
│    acumulo de intenções por tick)            │
└──────────────────────┬───────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌────▼─────┐ ┌─────▼─────┐
│   SERVIDOR   │ │ SERVIDOR │ │  SERVIDOR │
│    MUNDO     │ │   NPCs   │ │ INIMIGOS  │
│  (Física,    │ │ (Humanos,│ │ (Mycelion,│
│   Mapa,      │ │ Colonos, │ │  Castas,  │
│  Entidades,  │ │  AES,    │ │  Colmeia) │
│  Clima)      │ │ Civis)   │ │            │
└───────┬──────┘ └────┬─────┘ └─────┬─────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
         ┌────────────▼────────────┐
│      BANCO DE DADOS              │
│   (Estado Persistente,           │
│    Histórico de Ticks, Logs,    │
│    Economia, Memórias)          │
└───────────────────────────────────┘
        │
┌───────▼────────┐
│ TICK MESTRE    │
│ (Orquestrador  │
│  de frequências)│
└────────────────┘
```

## Tick Mestre (Master Tick Orchestrator)

O Tick Mestre é o coração do sistema. Ele não simula nada — apenas coordena:

- Mantém um clock global (`world_tick_counter`)
- Emite eventos `TICK_MECHANICS`, `TICK_ECONOMY_LOCAL`, `TICK_ECONOMY_GLOBAL`, `TICK_EVENTS`, `TICK_ECOLOGY`, `TICK_PERSISTENCE` nas frequências corretas
- Garante que ticks síncronos (Mecânicas → NPC → Hive) rodem em ordem
- Permite que ticks assíncronos (Economia, Eventos, Ecologia) rodem em paralelo
- Registra cada tick no banco de dados para determinismo e replay

### Frequências de Tick

| Tick | Frequência | O que processa |
|------|-----------|--------------|
| **Tick de Mecânicas** | 10 segundos | Movimento, combate, colisões, balística, construção/destruição, morte, ferimentos, interação direta |
| **Tick de NPC Rotina** | 10 segundos (sincronizado) | Decisões de IA, mudança de estado emocional, reação a eventos, início/fim de patrulhas, percepção |
| **Tick de Hive** | 10 segundos (sincronizado) | Movimento de castas Mycelion, liberação de feromônios, coordenação de swarms, evolução tática |
| **Tick de Economia Local** | 5 minutos | Transações em uma colônia, preços, produção de minas, consumo de suprimentos, salários, dívida |
| **Tick de Economia Global** | 30 minutos | Rotas interestelares, chegada de naves, balanço corporativo da AES, inflação entre colônias, mercado negro |
| **Tick de Eventos Emergentes** | 15 minutos (ou disparado) | Greves, revoltas, descobertas, colapsos, traições, deserções em massa, epidemias |
| **Tick de Ecologia** | 1 hora | Crescimento de flora, migração de fauna, ciclos climáticos, propagação de recursos naturais, evolução de castas |
| **Tick de Persistência** | 10 minutos | Save completo do estado do mundo no banco de dados |

## Servidor Mundo (World Server)

**Função**: Simula o planeta como sistema físico. Não conhece "jogador", "NPC" ou "inimigo". Conhece apenas entidades.

**Responsabilidades**:
- Física, colisões, balística, destruição de terreno, explosões
- Mapa: terreno + modificações (crateras, túneis, estruturas construídas/destruídas)
- Ecologia: flora, fauna não-hostil, cadeias alimentares, ciclos climáticos
- Clima: tempestades de poeira, chuva ácida, noites de 72h, eventos meteorológicos
- Construção/Destruição: qualquer entidade modifica o mundo indiscriminadamente

**Filosofia**: *O mundo não se importa quem você é. Ele apenas reage.*

## Servidor NPCs (Human Server)

**Função**: Simula toda a humanidade no planeta como agentes inteligentes.

**Responsabilidades**:
- Soldados: patrulhas, táticas, moral, trauma, deserção
- Mineradores/trabalhadores: rotinas de extração, transporte, reparos, greves
- Administradores/civis: distribuição de recursos, burocracia, corrupção, pânico
- Economia colonial: produção, consumo, comércio, inflação, filas, requisições
- Facções: relações diplomáticas, guerras internas, alianças, traições
- Reprints: reativação de clones, penalidades de memória, dívida
- Chassis: rastreamento, reparos, falhas, "despertares"
- Escravidão: monitoramento de indenturados, fuga, revoltas
- Rotinas diárias: sono, fome, socialização, trabalho, lazer, medo

**IA**: HTN (Hierarchical Task Networks) + GOAP (Goal-Oriented Action Planning) + sistemas emocionais.

## Servidor Inimigos (Hive Server)

**Função**: Simula os Mycelion como superorganismo.

**Responsabilidades**:
- Castas com IA diferenciada por função biológica
- Feromônios/sinais: marca no mundo, invisíveis aos humanos, legíveis aos Mycelion
- Evolução adaptativa: ajustes de geração em tempo real
- Ecologia nativa: ninhos, nutrição, ciclos de criação, conflitos inter-ninho
- Resposta a invasão: coordenação de swarms, emboscadas, contra-ataques

**Filosofia**: *Não há comando central. Há apenas o jardim, e a resposta imunológica.*

## Protocolo de Comunicação

Todos os servidores se comunicam via bus de eventos.

**Formato de Mensagem Universal**:
```json
{
  "tick": 1847293,
  "origin": "world|npc|hive|player",
  "entity_id": "uuid",
  "type": "move|fire|dig|damage|spawn|die|modify_terrain|emit_pheromone|trade|speak|order|intent",
  "payload": { ... }
}
```

**Princípio**: O Servidor Mundo **não lê o campo `origin`**. Um jogador que atira é indistinguível de um NPC ou de um Mycelion. A física é igual para todos.

**Cliente → Gateway → Mundo**: O cliente envia apenas **intenções de controle** ("mover para direção X", "atirar em direção Y", "interagir com objeto Z"). O servidor de mundo decide se a ação é válida e aplica física no próximo tick. O cliente **nunca** decide posição final, dano, ou resultado.

## Persistência e Reconexão

- O mundo salva estado completo a cada 10 minutos
- Jogadores desconectados mantêm suas entidades no mundo como NPCs inertes
- Quando reconectam, recebem um **resumo de eventos** ocorridos em sua ausência
- Se o personagem morreu enquanto offline, o jogador descobre isso ao tentar reconectar
- Se a colônia foi destruída, o jogador reconecta em um campo de ruínas

## Determinismo e Replay

Como o mundo opera em ticks discretos e o estado é totalmente computado, todo o histórico é deterministicamente replayável:
- Cada tick gera um hash de estado
- O histórico completo do mundo pode ser "rebobinado" para qualquer ponto no tempo
- Isso permite debug, investigação de bugs, e espectadores assistindo a eventos passados
