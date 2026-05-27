# Another No One — Design Document

## 1. Visão Central

**Another No One** é um jogo persistente de ação-tática sci-fi de mundo aberto 2D top-down com simulação emergente global, ambientado na colonização militar de um planeta remoto hostil. O jogador não é o escolhido. É um ativo descartável enviado para uma frente de guerra que devorou milhares antes dele.

O mundo não é em tempo real. É em **ticks**. A cada intervalo predefinido, o estado do mundo é computado e avança. Jogadores conectam-se, agem dentro de um tick, desconectam-se, e o mundo continua sem eles. Quando retornam, o mundo pode estar irrec
## 2. O Mundo: V1C5A302-H

### Nomenclatura

| Segmento | Significado |
|----------|-------------|
| **V** | Vida presente, Tipo 1 (macroscópica, biologia desenvolvida, ecossistema ativo) |
| **C5** | Quinto cluster de exploração do setor |
| **A** | Setor de catalogação |
| **302** | Posição 302 no catálogo geral de corpos celestes |
| **H** | Habitável com adaptações |

### Características Planetárias

- **Alta gravidade** (~1.3g): exige exoesqueletos ou modificação genética
- **Atmosfera rica em metais voláteis**: tempestades elétricas constantes, armas de energia imprevisíveis
- **Bioma hostil**: flora predatória, fauna agressiva, solo rico em cristais de fase
- **Ciclos extremos**: noites de 72 horas, tempestades de poeira que duram dias

### Por que a humanidade está aqui

**Cristais de Fase**: materiais essenciais para computação quântica de longa distância e campos de dobra espacial. Sem eles, as rotas interestelares colapsam. O planeta é vital. O planeta não sabe disso.

### A Colônia: Fortaleza Novo Amanhecer (FNA-01)

| Ano | Evento |
|-----|--------|
| Ano 1-3 | Terraformadores e geólogos pousam, erguem domos, começam extração |
| Ano 4 | Uma mina desaparece. 200 trabalhadores. Apenas rastros de escavação |
| Ano 5 | Três domos invadidos durante tempestade. Sem sobreviventes |
| Ano 6 | AES envia Companhia de Segurança (400 soldados). Perde 60% em duas semanas |
| Ano 7 | AES declara V1C5A302-H como "Zona de Conflito Ativo — Classe 4" |
| Ano 8 | Você chega. Reforço. Descartável. |

---

## 3. A Corporação: Atlas Extraction & Security (AES)

### O que é

A AES é uma **Sociedade Anônima Interplanetária**, não um governo. Compra direitos de extração de planetas catalogados, ergue infraestrutura, e contrata segurança armada para defender ativos. Cotada em bolsas de vários mundos coloniais.

### Divisões

| Divisão | Função |
|---------|--------|
| **Extração** | Mineração, colheita de gases, biomassa, cristais de fase |
| **Security** | Soldados, defesa de instalações, escolta de comboios |
| **Logística** | Transporte, manutenção de naves, cadeias de frio interestelares |
| **Bio-Assets** | Reprints (humanos modificados com backup neural) e Chassis (androides de combate) |

### Estrutura Hierárquica na Colônia

| Camada | Quem são |
|--------|----------|
| **Sede Orbital** | Executivos, contabilidade, tomadores de decisão estratégica. Invisíveis. |
| **Comando de Terreno** | Oficiais de carreira, cínicos, veteranos de outras frentes |
| **Operacional** | Soldados, pilotos, técnicos, mineradores, médicos de campanha |
| **Civis Contratados** | Cientistas, engenheiros, administradores de minas |

### Como a AES enxerga o jogador

> "O signatário reconhece que a reativação neural pós-falha é um serviço condicional à viabilidade operacional e orçamentária. A AES não garante continuidade de existência."

- **Reprint**: a AES possui seu backup neural. A reativação é um serviço pago, não um direito.
- **Chassis**: propriedade da empresa. Número de série, não nome. Se destruído, a contabilidade decide se fabrica outro.

**Another No One.**

---

## 4. Os Inimigos: Mycelion

### A Hipótese Mycelion

Os organismos catalogados em V1C5A302-H não são uma espécie nativa isolada. São uma **expressão local** de algo maior.

Xenobiólogos da AES encontraram organismos semelhantes em outros planetas: sempre aparentemente nativos, sempre organizados em colônias complexas, sempre em mundos com potencial de terraformação. Por décadas, trataram cada caso como isolado.

A hipótese *Mycelion* propõe uma **rede biológica dispersora** que viaja entre mundos. Uma matriz que infecta biologias locais, as reorganiza em colônias funcionais, e as usa para transformar o planeta. Cada planeta produz "cogumelos diferentes", mas todos são alimentados pelo mesmo micélio.

Os humanos ainda não provaram isso. A maioria dentro da AES rejeita a hipótese como "alarmismo científico".

### Designações

| Contexto | Nome |
|----------|------|
| Documentação científica AES | *Mycelion V1C5A302-H* |
| Soldados no chão | "Micélio", "Fungo", "Tecido", "Raiz" |
| Administradores AES | "Nativos", "Organismos Hostis Tipo 4", "Infestação Biotica" |
| Teóricos da conspiração | "A Rede", "O Tecido", "O Jardineiro" |

### Castas

| Casta | Nome Técnico | Papel | Comportamento |
|-------|-------------|-------|---------------|
| **Broca** | *Terebra* | Escava túneis, constrói infraestrutura subterrânea | Não combate. Foge. Libera ácido corrosivo se acuada. |
| **Escudo** | *Clypeus* | Defesa de colônias, linha de frente | Formam paredes vivas. Absorvem fogo para proteger castas atrás. |
| **Foice** | *Falx* | Ataque ofensivo, caça | Rápidos, silenciosos, emboscadas. Predadores. |
| **Olho** | *Oculus* | Vigilância, coordenação de feromônios | Frágeis. Se destruídos, Falx na área perdem coordenação. |
| **Mente-Colmeia** | *Genetrix Cerebrum* | Tomada de decisão estratégica do ninho | Imóvel, conectada por fios nervosos. Se destruída, ninho fica desorientado até outra crescer. |
| **Fazendeira** | *Agricola* | Cultiva fungos/bactérias simbióticas | Fixas no solo. Sustentam a colmeia. |

### Biologia

- **Metabolismo externo**: absorvem nutrientes de fungos/bactérias simbióticas que cultivam em suas carapaças
- **Comunicação**: feromônios, vibrações de substrato, bioeletricidade. Impossível de traduzir.
- **Inteligência**: coletiva e local. Sem líderes. Sem reis. Apenas funções.
- **Evolução adaptativa**: aprendem com táticas humanas. Usam granadas? Dispersam. Usam fogo? Carapaças engrossam.

---

## 5. O Jogador

### Reprint (Humano Geneticamente Modificado)

- Backup neural ativado após morte (se a AES autorizar e houver créditos)
- Cada morte custa. Morrer demais = dívida impagável = cancelamento de existência
- Memórias fragmentadas entre clones. Alguns juram lembrar coisas que o backup não deveria ter
- Mais versátil: usa biomods, drogas, feromônios alienígenas
- Frágil. Carne. Morre fácil.

### Chassi (Androide de Combate)

- Não tem backup. Chassis destruído = fim (a menos que backup local raro exista)
- Imune a venenos, falta de oxigênio, radiação, feromônios
- Reparos caros, precisam de oficinas
- Humanos confiam menos. Alienígenas detectam energia elétrica
- Sem estímulos biológicos. Algumas ações são menos intuitivas.
- Possibilidade de "despertar" — Chassis que desenvolvem comportamento anômalo

---

## 6. Perspectiva e Renderização

### 2D Top-Down

O jogo é apresentado em **perspectiva top-down 2D**. Visão isométrica ou ortogonal pura. O jogador vê o mundo de cima, como um mapa operacional tático, mas com profundidade suficiente para ler terreno, cobertura, e movimento de tropas.

Isso permite:
- Leitura clara de formações de batalha e movimento de swarms
- Interface limpa para gestão de recursos e informação tática
- Escalabilidade visual — o mesmo engine pode renderizar 1 soldado ou 500
- Baixo custo de produção de assets, permitindo foco em simulação

### Camada Gráfica Indiferente (Render Layer)

A arquitetura separa completamente **lógica de mundo** de **apresentação visual**:

```
┌──────────────────────────────────────────────┐
│           CLIENTE (Render Layer)              │
│  2D Top-Down / Futuro: 3D, Isométrico, etc  │
│  Recebe ESTADO → Renderiza PIXELS            │
│  Não decide. Não simula. Apenas exibe.       │
└───────────────────┬──────────────────────────┘
                    │  Protocolo de Estado
                    │  (JSON binário / protobuf)
┌───────────────────▼──────────────────────────┐
│           SERVIDOR MUNDO (World Server)        │
│  Simula física, entidades, colisões, terreno   │
│  Não sabe que existe gráfico. Não se importa. │
└────────────────────────────────────────────────┘
```

**O Servidor Mundo nunca sabe como ele está sendo visto.** Ele apenas emite:
- Posições de entidades (x, y, z, ângulo, velocidade)
- Estados de terreno (modificado, destruído, construído)
- Eventos de física (explosão em X,Y, dano em entidade #UUID)
- Estados de entidades (vivo, morto, ferido, operando máquina)

**O Cliente Render decide:**
- Qual sprite/textura usar para cada entidade
- Como animar uma transição de movimento
- Quais efeitos visuais aplicar sobre um evento
- Zoom, câmera, filtros de UI, minimapa

**Isso é perfeitamente possível** e é exatamente como muitos jogos modernos de escala operam. O servidor simula. O cliente desenha. Se amanhã você quiser mudar de 2D top-down para 3D isométrico ou até first-person, o servidor de mundo permanece **intacto**. Apenas o cliente render muda.

**Benefícios práticos:**
- Múltiplos clientes visuais podem coexistir (modo tático top-down para PC, interface minimapa para mobile, visualização 3D para espectadores)
- Testes de servidor sem gráfico — você pode rodar o mundo em um terminal sem GPU
- Replays determinísticos — grave o stream de estado do servidor e reproduza em qualquer cliente
- Modding visual — comunidade pode criar skins, texturas, e até engines de renderização alternativos sem tocar no servidor

---

## 7. Sistema de Ticks e Persistência

### O mundo não espera

Another No One não é um jogo que roda apenas quando há jogadores conectados. É um **servidor persistente** que opera continuamente. Jogadores entram, agem dentro de um ciclo de tick, desconectam-se, e o mundo continua. Quando retornam — uma hora depois, um dia depois, uma semana depois — podem encontrar uma colônia destruída, uma guerra encerrada, ou um deserto onde antes havia amigos.

### Tick Mestre (Master Tick Orchestrator)

Um orquestrador central mantém o tempo do mundo. Ele não simula nada. Apenas dispara eventos de tick para os servidores especializados em frequências predefinidas.

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

### O Ciclo de Tick de 10 Segundos

A cada 10 segundos reais, o mundo computa uma "rodada" completa:

1. **Fase de Intenção**: Todos os clientes conectados enviam comandos para o Gateway (mover, atirar, falar, construir, comerciar, usar item). NPCs e Mycelion geram suas próprias intenções via IA.
2. **Fase de Resolução de Física**: O Servidor Mundo processa todas as intenções simultaneamente:
   - Resolve colisões e movimentos finais
   - Calcula balística (projéteis em trajetória)
   - Aplica dano de impacto, explosão, fogo
   - Processa destruição de terreno e construção
   - Determina posições finais de todas as entidades
3. **Fase de Reação**: NPCs e Mycelion reagem ao novo estado:
   - NPCs avaliam: amigo morreu? Inimigo visível? Recurso acabou?
   - Mycelion processam feromônios liberados e ajustam comportamento de castas
4. **Fase de Notificação**: O novo estado é broadcast para todos os clientes conectados. O cliente renderiza transições (animações, efeitos, sons). Jogadores offline não recebem — eles descobrirão quando reconectarem.

**O jogador vê o resultado. Não participa da resolução.** Isso é como um jogo de estratégia simultâneo — todos agem, o mundo resolve, todos veem.

### Ticks Assíncronos vs. Síncronos

- **Ticks síncronos** (10s): Mecânicas, NPC, Hive — devem rodar **em sequência**, um após o outro, porque a resolução de um afeta o outro (física gera corpos mortos, NPCs reagem a corpos, Hive reage a disparos)
- **Ticks assíncronos** (5min, 15min, 30min, 1h): Economia, eventos, ecologia — podem rodar em paralelo, pois operam em abstrações mais altas e não dependem de posições exatas no mapa

### Persistência e Reconexão

- O mundo salva estado completo a cada 10 minutos
- Jogadores desconectados mantêm suas entidades no mundo como NPCs inertes (dormindo, em coma, ou simplesmente "offline" no lore)
- Quando reconectam, recebem um **resumo de eventos** ocorridos em sua ausência (gerado automaticamente a partir do log de ticks)
- Se o personagem morreu enquanto offline, o jogador descobre isso ao tentar reconectar. O jogo oferece reativação (se Reprint e houver créditos) ou fim de personagem
- Se a colônia foi destruída, o jogador reconecta em um campo de ruínas

### Determinismo e Replay

Como o mundo opera em ticks discretos e o estado é totalmente computado, todo o histórico é deterministicamente replayável:
- Cada tick gera um hash de estado
- O histórico completo do mundo pode ser "rebobinado" para qualquer ponto no tempo
- Isso permite debug, investigação de bugs, e espectadores assistindo a eventos passados

---

## 8. Simulação de Mundo Vivo (Escala Global)

O servidor de simulação não é um jogo de "missões e spawns". É um **mundo autônomo** onde entidades têm vidas, necessidades, objetivos, e conflitos.

### 8.1 Economia Viva

A economia de V1C5A302-H não é uma loja com preços fixos. É um sistema dinâmico:

| Componente | Funcionamento |
|------------|---------------|
| **Oferta e Demanda** | Cristais de fase extraídos aumentam oferta; rotas interrompidas por Mycelion reduzem oferta. Preços flutuam em tempo real. |
| **Escassez de Suprimentos** | Comida, munição, medicamentos, combustível vêm de fora do planeta. Naves de suprimento têm calendários. Se uma nave é destruída, a colônia sente em semanas. |
| **Comércio Interno** | Soldados compram de contrabandistas. Mineradores vendem minerais extras no mercado negro. Administradores desviam recursos. |
| **Inflação e Colapso** | Se a produção de cristais para, a AES corta reforços. Sem reforços, a Security perde território. Sem território, as minas fecham. Espiral de morte. |
| **Créditos e Dívida** | Reprints ganham créditos por missões, mas pagam pela própria reativação. Alguns terminam como escravos de dívida da AES. |

### 8.2 Facções Autônomas

Múltiplas facções operam no planeta simultaneamente, com objetivos próprios:

| Facção | Objetivo | Relação com Jogador |
|--------|----------|---------------------|
| **AES Security** | Manter extração e defender instalações | Empregador. Te paga. Te descarta. |
| **AES Extração** | Maximizar produção de cristais | Te usa como escolta. Sem escolta, minas morrem. |
| **Sindicato dos Trabalhadores** | Condições melhores, menos mortes | Pode te recrutar para sabotagem ou proteção de greves |
| **Contrabandistas do Vazio** | Lucro no mercado negro | Vendem equipamento proibido. Confiáveis até o preço subir. |
| **Desertores/Fora-da-Lei** | Sobreviver longe da AES | Hostis ou neutros. Alguns formam vilas independentes. |
| **Cientistas Renegados** | Estudar Mycelion a qualquer custo | Podem te usar como isca. Ou te salvar se você trouxer amostras. |
| **Mycelion** | Expandir, consumir, transformar | Inimigo. Mas também só está fazendo o que biologia manda. |

Facções **entram em guerra entre si** sem avisar o jogador. Uma greve na mina Alpha pode paralisar a produção. Os contrabandistas podem armar os desertores. A AES pode bombardear uma vila suspeita. O jogador descobre isso ao vivo, no campo, ou pelo rádio.

### 8.3 Sistema de Escravidão e Servidão

A AES não usa o termo "escravidão". Usa "contratos de indentura", "dívida operacional", e "reação de serviço compulsório".

- **Reprints endividados**: soldados que morreram demais e não conseguem pagar a reativação são colocados em "programas de recuperação de custo" — trabalho forçado em minas perigosas até a dívida zerar (nunca zera).
- **Prisioneiros de guerra**: capturados por Mycelion? Não existem prisioneiros. Os Mycelion não capturam. Mas desertores capturados pela AES são "reclassificados" como mão de obra penal.
- **Chassis reaproveitados**: androides danificados que a AES decide não reparar são vendidos para contrabandistas, que os recondicionam e revendem.

O jogador pode:
- **Liberar escravos** (tornando-se inimigo da AES)
- **Comprar escravos** (tornando-se parte do sistema)
- **Ignorar** (a maioria faz isso)
- **Ser capturado** (Reprints endividados podem ser "reclassificados" em campo)

### 8.4 Rotinas e Vidas dos NPCs

Cada NPC humano no planeta tem uma vida completa:

- **Horário**: dorme, acorda, trabalha, come, socializa, patrulha, descansa
- **Necessidades**: fome, sede, sono, moral, medo, saúde, sanidade
- **Relacionamentos**: ama, odeia, confia, trai, protege, vinga
- **Ambição**: quer subir de cargo, acumular créditos, desertar, ou apenas sobreviver até a próxima nave de suprimentos
- **Memória**: lembra de quem o ajudou, quem o roubou, quem morreu ao lado dele
- **Morte**: quando um NPC morre, ele é removido do mundo. Outro pode ser enviado como substituto — ou não.

NPCs agem mesmo quando o jogador está do outro lado do planeta. Um minerador pode decidir desertar à noite. Um soldado pode assassinar um oficial por vingança. Um contrabandista pode negociar com desertores. Tudo isso acontece em ticks, continuamente.

### 8.5 Escala Global

O planeta inteiro é simulado, não apenas a área ao redor do jogador:

- **Múltiplas colônias**: FNA-01 é a maior, mas existem outras instalações menores, algumas já abandonadas, outras sitiadas
- **Rotas de suprimento**: naves aterrissam em intervalos regulares em zonas de pouso. Se a zona é tomada por Mycelion, nenhuma nave pousa.
- **Comunicação de longa distância**: rádio tem alcance limitado. Notícias de outras colônias chegam com delay, ou não chegam.
- **Eventos globais**: uma praga em uma colônia pode se espalhar. Uma revolta em outra pode inspirar desertores na sua área.

---

## 9. Arquitetura de Servidor

### 9.1 Visão Geral

```
┌──────────────────────────────────────────────┐
│           CLIENTE (Render Layer)              │
│        2D Top-Down / Input / UI / Áudio      │
│   Recebe ESTADO do mundo → desenha PIXELS    │
│   Envia INTENÇÕES → Gateway                  │
└──────────────────────┬───────────────────────┘
                       │  Protocolo de Estado
                       │  (Posições, Eventos,
                       │   Snapshot parcial)
                       │
                       │  Protocolo de Intenção
                       │  (Mover, Atirar, Usar)
┌──────────────────────▼───────────────────────┐
│           GATEWAY / ORQUESTRADOR            │
│   (roteamento, autenticação, matchmaking,   │
│    broadcast de estado, delta compression,    │
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

### 9.2 Tick Mestre (Master Tick Orchestrator)

O Tick Mestre é o coração do sistema. Ele não simula nada — apenas coordena:
- Mantém um clock global (`world_tick_counter`)
- Emite eventos `TICK_MECHANICS`, `TICK_ECONOMY_LOCAL`, `TICK_ECONOMY_GLOBAL`, `TICK_EVENTS`, `TICK_ECOLOGY`, `TICK_PERSISTENCE` nas frequências corretas
- Garante que ticks síncronos (Mecânicas → NPC → Hive) rodem em ordem
- Permite que ticks assíncronos (Economia, Eventos, Ecologia) rodem em paralelo
- Registra cada tick no banco de dados para determinismo e replay

### 9.3 Servidor Mundo (World Server)

**Função**: Simula o planeta como sistema físico. Não conhece "jogador", "NPC" ou "inimigo". Conhece apenas entidades.

**Responsabilidades**:
- **Física**: colisões, balística, destruição de terreno, explosões, trajetórias de projéteis
- **Mapa**: terreno + modificações (crateras, túneis, estruturas construídas/destruídas)
- **Ecologia**: flora, fauna não-hostil, cadeias alimentares, ciclos climáticos
- **Clima**: tempestades de poeira, chuva ácida, noites de 72h, eventos meteorológicos
- **Construção/Destruição**: qualquer entidade modifica o mundo indiscriminadamente

**Filosofia**: *O mundo não se importa quem você é. Ele apenas reage.*

**Comunicação com Cliente**: O World Server emite snapshots de estado (entidades + terreno dentro do raio de simulação ativa) e eventos pontuais (explosão, tiro, morte). O cliente renderiza isso. O World Server **nunca recebe comandos de renderização**.

### 9.4 Servidor NPCs (Human Server)

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

**IA**: HTN (Hierarchical Task Networks) + GOAP (Goal-Oriented Action Planning) + sistemas emocionais (medo, fadiga, lealdade, desespero, ambição). Cada NPC tem memória de curto prazo (últimas 24h) e longo prazo (eventos marcantes, relacionamentos, traumas).

### 9.5 Servidor Inimigos (Hive Server)

**Função**: Simula os Mycelion como superorganismo.

**Responsabilidades**:
- Castas com IA diferenciada por função biológica
- Feromônios/sinais: marca no mundo, invisíveis aos humanos, legíveis aos Mycelion
- Evolução adaptativa: ajustes de geração em tempo real
- Ecologia nativa: ninhos, nutrição, ciclos de criação, conflitos inter-ninho
- Resposta a invasão: coordenação de swarms, emboscadas, contra-ataques

**Filosofia**: *Não há comando central. Há apenas o jardim, e a resposta imunológica.*

### 9.6 Protocolo de Comunicação

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

---


---

## 12. Camadas de Abstração e Níveis de Simulação

### O Problema

É impossível simular cada soldado, cada tiro, cada bala, cada feromônio, cada transação comercial, e cada célula de Mycelion em todo o planeta, o tempo todo. V1C5A302-H é um mundo. Um mundo requer **escala**.

A solução é **abstração por proximidade e relevância**: entidades são simuladas com o nível de detalhe que sua situação exige. Um soldado em combate ativo é entidade individual com física granular. Um soldado dormindo em um quartel a 50km de qualquer jogador é apenas um número em uma planilha de tropas.

### As Cinco Camadas de Simulação

| Camada | Nome | Granularidade | O que simula | Tick |
|--------|------|---------------|--------------|------|
| **Nível 1** | **Micro/Tático** | Entidade individual | Posição exata, colisão, balística, combate corpo-a-corpo, interação com terreno, ferimentos locais | 10s |
| **Nível 2** | **Meso/Tático Agregado** | Grupo de 5-50 entidades | Coordenadas aproximadas, estatísticas agregadas (moral, munição, saúde média), ações em lote ("pelotão patrulha setor B"), resolução simplificada de combate | 10s |
| **Nível 3** | **Macro/Regional** | Facção ou Instalação | Produção de minas, estado de colônias, movimento de comboios entre regiões, saldo de forças em um setor, relações diplomáticas | 5-15min |
| **Nível 4** | **Global/Planetário** | Planeta como sistema | Chegada de naves, balanço corporativo da AES, eventos climáticos globais, expansão Mycelion planetária, rotas interestelares | 30min-1h |
| **Nível 5** | **Arquivado** | Eventos passados | Registros históricos, memórias de NPCs mortos, territórios abandonados, ruínas | Não simula, apenas registra |

### O Sistema de Promoção e Demosião

Entidades mudam de camada de abstração dinamicamente, dependendo de onde os jogadores estão e do que está acontecendo:

**Promoção (Demolição de Abstração)**
Quando um jogador se aproxima de uma entidade abstrata, ela é "demolido" em entidades individuais:
- Um pelotão de 30 soldados (Nível 2) se torna 30 soldados com nomes, posições, inventários (Nível 1)
- Uma mina (Nível 3) se torna corredores, mineradores, máquinas, guardas (Nível 1)
- Um ninho Mycelion (Nível 2) se torna castas individuais em túneis (Nível 1)

O processo é **determinístico e reproduzível**: dado o estado da entidade abstrata e uma seed, a demolição sempre gera as mesmas entidades individuais. Isso permite replay e debug.

**Demosião (Abstração de Agregação)**
Quando nenhum jogador está próximo e não há eventos ativos, entidades individuais são "promovidas" para abstrações:
- 30 soldados patrulhando uma área segura se tornam um único registro de pelotão com estatísticas agregadas
- Um ninho Mycelion sem atividade recente se torna um ponto no mapa com força aproximada
- Uma colônia inteira pode operar como uma fábrica de números enquanto ninguém está lá

**Critérios de Promoção/Demosião:**

| Critério | Promoção (Detalhe) | Demosião (Abstração) |
|----------|-------------------|----------------------|
| **Distância a jogadores** | < 2km de qualquer jogador conectado | > 5km de todos os jogadores |
| **Atividade de combate** | Em combate nos últimos 3 ticks | Sem combate nos últimos 10 ticks |
| **Interação relevante** | Interagiu com entidade do jogador | Sem interação relevante por 1 hora |
| **Evento narrativo** | NPC importante morre, colônia é atacada, descoberta científica | Evento resolvido, consequências estabilizadas |
| **Economia crítica** | Instalação em colapso financeiro | Operação normal |

### Fatias de Abstração (Abstraction Slices)

O Servidor Mundo não opera em uma única camada. Ele opera em **fatias simultâneas**:

```
┌───────────────────────────────────────────────┐
│              SIMULAÇÃO ATIVA                   │
│                                                │
│  [Nível 1] Jogador + entidades próximas        │
│     ├── 200 entidades individuais              │
│     ├── física granular, colisões reais        │
│     └── combate tático em tempo de tick        │
│                                                │
│  [Nível 2] Região adjacente (5km-20km)         │
│     ├── 15 grupos agregados                    │
│     ├── resolução estatística de patrulhas     │
│     └── combate em lote ("pelotão X perde 3")  │
│                                                │
│  [Nível 3] Outras colônias no planeta          │
│     ├── 7 instalações como registros econômicos│
│     ├── produção, consumo, dívida              │
│     └── eventos emergentes em resumo           │
│                                                │
│  [Nível 4] Planeta como sistema orbital        │
│     ├── naves em trânsito                      │
│     ├── balanço AES, decisões corporativas     │
│     └── expansão Mycelion global               │
│                                                │
│  [Nível 5] Passado arquivado                   │
│     ├── registros de mortes, traições, ruins   │
│     ├── memórias herdadas por NPCs sobreviventes│
│     └── terreno modificado permanentemente     │
│                                                │
└───────────────────────────────────────────────┘
```

### O Algoritmo de Decisão de Camada

A cada tick, o orquestrador pergunta para cada entidade:

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

### Consequências Práticas

- **Performance**: O Servidor Mundo processa ~200-500 entidades em Nível 1 e ~10.000 entidades em Níveis 2-4 por tick. Sem abstração, seriam 50.000+ entidades em Nível 1 — impossível.
- **Escalabilidade**: Novos jogadores conectando-se não sobrecarregam o servidor, apenas "promovem" mais entidades para Nível 1 temporariamente.
- **Narrativa**: Um jogador pode viajar 50km e encontrar uma colônia destruída que, 2 horas atrás, era apenas um número em Nível 3. O abismo entre abstração e realidade é parte da experiência.
- **Exploração**: Áreas remotas do planeta podem ter surpresas geradas em Nível 3 e só "demolidas" quando um jogador chega. Isso é procedural e determinístico.

### Persistência por Camada

| Camada | Persistido como | Quando salva |
|--------|--------------|--------------|
| Nível 1 | Estado completo de cada entidade (posição, inventário, saúde, memórias) | Cada tick de persistência (10min) |
| Nível 2 | Estado agregado do grupo + seed de demolição | Cada tick de persistência |
| Nível 3 | Registros econômicos e políticos da instalação | Cada tick de economia local (5min) |
| Nível 4 | Estado planetário (naves, corporação, ecologia global) | Cada tick de economia global (30min) |
| Nível 5 | Logs de eventos, terreno modificado, NPCs mortos | Após resolução de evento |

### O Jogador e a Abstração

O jogador vive quase sempre em **Nível 1**. Ele vê cada tiro, cada passo, cada NPC.

Mas o jogador também interage com abstrações:
- O mapa mostra movimento de forças em Nível 2 como ícones de pelotão
- Relatórios de colônias distantes (Nível 3) chegam por rádio
- Decisões da AES (Nível 4) afetam reforços e orçamento
- O histórico de batalhas (Nível 5) é consultável em terminais

**A revelação**: Quando um jogador morre em Nível 1, sua morte é imediatamente arquivada em Nível 5. Outro jogador pode, horas depois, ler um relatório resumido sobre "baixa #4472, setor G" sem jamais saber que #4472 era um jogador. Para o sistema, não havia diferença.

**Another No One.**

---
---

## 13. Simulação Sob Demanda e Persistência Preguiçosa

### O Problema

Mesmo com cinco camadas de abstração, simular um planeta inteiro continuamente é desperdício. Milhares de entidades em regiões remotas nunca interagem com jogadores. Colônias abandonadas, ninhos Mycelion dormentes, naves interestelares em trânsito — tudo isso consome ciclos de CPU sem produzir valor.

A solução é **não simular até que seja necessário**.

### Simulação Sob Demanda (Lazy Simulation)

O princípio é simples:

> Uma entidade, região, ou sistema que não está sendo observado não existe em memória como estado contínuo. Quando alguém pergunta por ela, o sistema calcula o estado atual aplicando as regras do jogo ao último estado conhecido + tempo decorrido.

O resultado é **indistinguível** de uma simulação contínua, mas custa uma fração do processamento.

### Camadas de Persistência

| Camada | Nome | O que persiste | Como é consultado |
|--------|------|--------------|-------------------|
| **P1** | **Ativo/Hot** | Estado completo em memória, tick por tick | Regiões com jogadores próximos, combate ativo, economia em crise |
| **P2** | **Adormecido/Warm** | Snapshot a cada 10 minutos + log de eventos relevantes | Regiões que tiveram jogadores recentemente, facções em conflito |
| **P3** | **Congelado/Cold** | Apenas estado-base + seed de simulação + timestamp do último cálculo | Regiões sem interação por horas, naves em trânsito, colônias estáveis |
| **P4** | **Latente/Frozen** | Apenas parâmetros de geração procedural + histórico de eventos passados | Ruínas abandonadas, territórios não-reivindicados, espaço interestelar |

### Como a Simulação Sob Demanda Funciona

#### Exemplo 1: Colônia Estável a 200km

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
4. O resultado é um novo snapshot: Beta-7 agora tem X cristais, Y suprimentos, Z moral, e 3 eventos ocorridos (um acidente de mina, um caso de contrabando, um soldado desertor).
5. Beta-7 é promovida para P2 (Adormecido) ou P1 (Ativo), dependendo da distância do jogador.

**A fórmula é determinística**. Dado o mesmo estado-base, seed, e intervalo de tempo, o resultado é sempre idêntico. Isso permite replay e debug.

#### Exemplo 2: Nave Interestelar em Trânsito

**Cenário**: Uma nave de suprimentos partiu de uma estação orbital há 3 dias. Chegaria em V1C5A302-H em 5 dias.

**P4 (Latente)**: A nave não existe como entidade no Servidor Mundo. Existe apenas como:
```json
{
  "id": "nav_4472",
  "estado": "em_transito",
  "origem": "Estacao_Orbital_Alpha",
  "destino": "V1C5A302-H_PontoPouso_01",
  "partida": 1699123456,
  "chegada_prevista": 1699567890,
  "carga": { "suprimentos": 5000, "municao": 2000, "combustivel": 10000 },
  "seed": "a7f3d9e2"
}
```

**Quando chega a hora**: O sistema simplesmente verifica `timestamp_atual >= chegada_prevista`. Se sim, a nave é materializada no Servidor Mundo como uma entidade em P1. Se algo aconteceu no meio do caminho (atraso, ataque de piratas, falha mecânica), isso foi determinado pela seed quando a nave foi gerada — não precisa ser simulado durante o trânsito.

#### Exemplo 3: Ninho Mycelion Dormente

**Cenário**: Um ninho Mycelion não foi perturbado em 2 semanas.

**P3 (Congelado)**: O ninho existe apenas como:
```json
{
  "id": "ninho_sector_G7",
  "forca_aproximada": 450,
  "castas": { "Broca": 200, "Escudo": 150, "Foice": 80, "Olho": 15, "Mente": 3, "Fazendeira": 1200 },
  "expansao_acumulada": 0.3,
  "ultima_perturbacao": 1698000000,
  "seed": "mycelion_g7_seed"
}
```

**Quando um jogador chega a 2km**: O sistema calcula:
- Crescimento populacional = `formula_crescimento(castas, 2semanas, seed)`
- Novos túneis escavados = `formula_expansao(expansao_acumulada, 2semanas, seed)`
- Eventos internos (morte de Mente-Colmeia, conflito com outro ninho) = `DeterministicRNG(seed, regras_ninho)`
- O ninho é "descongelado" em P1 com todas as entidades individuais posicionadas de forma consistente com o estado calculado.

### Fórmulas de Resolução em Batch

Cada tipo de sistema tem sua própria fórmula de resolução:

| Sistema | Fórmula | Variáveis |
|---------|---------|-----------|
| **Produção de mina** | `miners * taxa_base * delta_t * (1 - fator_acidente(seed))` | Número de mineradores, taxa base do mineral, tempo decorrido, eventos aleatórios determinísticos |
| **Consumo de suprimentos** | `populacao * consumo_per_capita * delta_t * fator_clima(seed)` | População, consumo por pessoa, tempo, variação climática |
| **Moral de colônia** | `moral_base - (estresse * delta_t) + (eventos_positivos(seed) * delta_t)` | Moral inicial, fatores de estresse, eventos aleatórios |
| **Crescimento Mycelion** | `populacao_atual * taxa_reproducao * delta_t * fator_limitante(seed)` | População, taxa biológica, recursos disponíveis |
| **Movimento de naves** | `posicao = origem + (vetor * delta_t)` | Posição inicial, velocidade, tempo. Eventos pré-determinados pela seed. |
| **Economia de mercado negro** | `oferta = producao_acumulada(seed); demanda = consumo_acumulado(seed); preco = f(oferta, demanda, volatilidade)` | Produção, consumo, tempo, volatilidade de mercado |

### Determinismo e Seed

Toda entidade em P3 ou P4 carrega uma **seed de simulação**. Essa seed é usada para gerar todos os eventos "aleatórios" que ocorreriam se a entidade tivesse sido simulada tick por tick.

```
seed = hash(entity_id + timestamp_congelamento + estado_base)
```

Isso garante:
- **Reprodutibilidade**: o mesmo estado-base + tempo sempre gera o mesmo resultado
- **Debug**: é possível "rebobinar" e ver exatamente o que aconteceu
- **Anti-cheat**: o servidor pode verificar se o estado calculado está correto
- **Economia de recursos**: nada é computado até ser necessário

### Transição Entre Camadas de Persistência

```
P1 (Ativo) → P2 (Adormecido): 10 minutos sem interação de jogador
P2 (Adormecido) → P3 (Congelado): 1 hora sem interação
P3 (Congelado) → P4 (Latente): 24 horas sem interação + estado estável

P4 (Latente) → P3 (Congelado): Consulta por jogador ou evento global
P3 (Congelado) → P2 (Adormecido): Jogador a 50km
P2 (Adormecido) → P1 (Ativo): Jogador a 2km ou evento de combate
```

A transição **para cima** (descongelamento) é sempre feita via simulação sob demanda.
A transição **para baixo** (congelamento) é sempre feita salvando snapshot + seed.

### O Banco de Dados e as Camadas

| Camada | Onde vive | Formato |
|--------|-----------|---------|
| P1 (Ativo) | Memória RAM do servidor | Objetos de simulação completos |
| P2 (Adormecido) | Memória RAM + Snapshot no banco a cada 10min | Snapshot JSON + log de eventos |
| P3 (Congelado) | Apenas banco de dados | Estado-base compacto + seed + timestamp |
| P4 (Latente) | Banco de dados ou até arquivos frios | Parâmetros de geração + histórico de eventos passados |

### Vantagens

- **Escalabilidade ilimitada**: O planeta pode ter 100 colônias, 50 ninhos Mycelion, 200 naves em trânsito, e 100.000 NPCs. Apenas os que estão próximos de jogadores existem em memória.
- **Persistência verdadeira**: O mundo "existe" mesmo quando ninguém está jogando, mas sem custo computacional.
- **Surpresa procedural**: Um jogador pode viajar para um setor remoto e descobrir que, durante as 72 horas em que ninguém foi lá, um ninho Mycelion cresceu 300%, uma colônia colapsou economicamente, ou uma nave de piratas aterrissou. Tudo isso é calculado no momento da chegada, mas é consistente com as regras do mundo.
- **Debugging poderoso**: Como tudo é determinístico, é possível recriar o estado exato de qualquer ponto no tempo para investigar bugs.

### Consequência Narrativa

O jogador nunca sabe se uma colônia foi "simulada" ou "calculada". Para ele, o mundo sempre pareceu existir. A diferença é que, quando ele chega a um lugar abandonado, a história que encontra não foi escrita por um designer. Foi computada pelas regras do jogo.

Uma mina pode ter fechado porque a fórmula de produção calculou que os suprimentos acabaram. Um soldado pode ter desertado porque a fórmula de moral calculou que ele passou do limite. Um ninho Mycelion pode ter invadido uma colônia porque a fórmula de expansão calculou que eles atingiram capacidade.

**O mundo é um sistema de equações. O jogador é apenas uma variável que entra e sai.**

---
## 10. Temas e Experiência

### 10.1 O Jogo Pergunta

- É possível deixar de ser "Another No One" em um sistema que te trata como recurso?
- Se você é substituível, o que sobrevive de verdade?
- Você pode ser lembrado por NPCs que não sabem que você já morreu uma vez?
- Os Mycelion são o inimigo, ou são apenas fazendo o mesmo que a humanidade — colonizar?
- O que significa "liberdade" em um mundo onde até a escolha de ser livre tem preço?
- O mundo avançou sem você enquanto dormia. O que isso diz sobre a sua importância?

### 10.2 Arco Emocional

1. **Desembarque**: Você é um número em uma fila. Ninguém olha para você.
2. **Terror**: Os Mycelion não são "monstros". São um sistema. E você está dentro dele.
3. **Rotina**: A guerra normaliza. Você patrulha, extrai, repara, espera.
4. **Conexão**: Alguns NPCs começam a reagir a você como indivíduo. Isso é reconfortante. Ou aterrorizante.
5. **Comércio e Traição**: Você descobre que a colônia tem uma economia viva. E que a AES é apenas uma facção entre várias.
6. **Ausência**: Você desconecta. Volta. O mundo mudou. Alguém morreu. Alguém desertou. Algo foi construído. Algo foi destruído.
7. **Crise**: Você morre. E volta. Ou não volta. Ou volta diferente. Ou volta endividado.
8. **Escolha**: Persistir como número? Desertar? Tentar ser alguém? Ser destruído? Mudar o mundo?

---

## 11. Referências Inspiracionais

- Colonização sci-fi militar sombria
- Simulação emergente profunda (mundos que vivem sem o jogador)
- Economia viva, facções autônomas, escravidão e liberdade em sandbox
- Arquitetura de servidor distribuído como metáfora narrativa
- Biologia de superorganismos (formigas, fungos, corais)
- Economia de guerra e corporações militares privadas
- Questões de identidade em clones, backups, e máquinas conscientes
- Separação de camada lógica e camada gráfica (arquitetura limpa)
- Jogos persistentes com ticks onde o mundo avança independente do jogador



