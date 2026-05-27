# Another No One — Design Document

## 1. Visão Central

**Another No One** é um jogo persistente de ação-tática sci-fi de mundo aberto 2D top-down com simulação emergente global, ambientado na colonização militar de um planeta remoto hostil. O jogador não é o escolhido. É um ativo descartável enviado para uma frente de guerra que devorou milhares antes dele.

O mundo não é em tempo real. É em **ticks**. A cada intervalo predefinido, o estado do mundo é computado e avança. Jogadores conectam-se, agem dentro de um tick, desconectam-se, e o mundo continua sem eles. Quando retornam, o mundo pode estar irreconhecível.

> *"You are not the chosen one. You are not even someone. But you can become anything — or cease to exist."*

### Pilares de Design

1. **Mundo Persistente e Autônomo**: O planeta avança em ticks independente de jogadores. Economia, facções, comércio, escravidão, guerras — tudo evolui sozinho, 24 horas por dia.
2. **Substituibilidade**: Cada morte consome recursos. Morrer demais = fim da existência.
3. **Arquitetura em Camadas**: O jogo roda em servidores especializados que não se conhecem.
4. **Camada Gráfica Indiferente**: O servidor de mundo não sabe que existe gráfico. O render é apenas um cliente que consome estado. O visual pode ser totalmente alterado sem tocar na lógica.
5. **Ticks Múltiplos**: Diferentes sistemas operam em frequências diferentes. Física a cada 10 segundos. Economia a cada 5 minutos. Eventos globais a cada 15 minutos. Ecologia a cada hora.
6. **Ausência de Narrativa Linear**: Não existe "história principal". Existe apenas a guerra, a extração, e a sobrevivência.

---

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

