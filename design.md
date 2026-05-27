# Another No One — Design Document

## 1. Visão Central

**Another No One** é um jogo de ação-tática sci-fi de mundo aberto com simulação emergente, ambientado na colonização militar de um planeta remoto hostil. O jogador não é o escolhido. É um ativo descartável enviado para uma frente de guerra que devorou milhares antes dele.

> *"You are not the chosen one. You are not even someone. But you can become anything — or cease to exist."*

### Pilares de Design

1. **Mundo Autônomo**: O planeta simula em tempo real independente do jogador. O mundo não diferencia jogadores, NPCs ou inimigos.
2. **Substituibilidade**: Cada morte consome recursos. Morrer demais = fim da existência.
3. **Arquitetura em Camadas**: O jogo roda em servidores especializados que não se conhecem — assim como ninguém no jogo conhece o jogador.
4. **Ausência de Narrativa Linear**: Não existe "história principal". Existe apenas a guerra, a extração, e a sobrevivência.

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

Os humanos ainda não provaram isso. A maioria dentro da AES rejeita a hipótese como "alarmismo científico". Mas os que trabalham no chão sentem que algo não se encaixa. Os Nativos são muito organizados para serem "apenas fauna".

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

## 6. Arquitetura de Servidor

### Visão Geral

```
┌──────────────────────────────────────────┐
│              CLIENTE (Jogador)          │
│          Render, Input, Predição Local    │
└───────────────────┬──────────────────────┘
                    │
┌───────────────────▼──────────────────────┐
│          GATEWAY / ORQUESTRADOR          │
│   (roteamento, autenticação, eventos)    │
└───────────────────┬──────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
┌───────▼─────┐ ┌───▼─────┐ ┌───▼─────┐
│  SERVIDOR   │ │SERVIDOR │ │ SERVIDOR│
│    MUNDO    │ │  NPCs   │ │INIMIGOS │
│ (Física,    │ │(Humanos,│ │(Nativos,│
│  Mapa,      │ │ Colonos,│ │ Castas, │
│  Entidades) │ │  AES)   │ │ Colmeia)│
└───────┬─────┘ └────┬────┘ └────┬────┘
        │            │           │
        └────────────┴───────────┘
                     │
         ┌───────────▼───────────┐
         │   BANCO DE DADOS      │
         │  (Estado Persistente)  │
         └────────────────────────┘
```

### Servidor Mundo (World Server)

**Função**: Simula o planeta como sistema físico. Não conhece "jogador", "NPC" ou "inimigo". Conhece apenas entidades.

**Responsabilidades**:
- Física, colisões, balística, destruição de terreno, explosões
- Mapa: terreno + modificações (crateras, túneis, estruturas)
- Ecologia: flora e fauna não-hostil, cadeias alimentares, ciclos climáticos
- Construção/Destruição: qualquer entidade modifica o mundo indiscriminadamente

**Filosofia**: *O mundo não se importa quem você é. Ele apenas reage.*

### Servidor NPCs (Human Server)

**Função**: Simula toda a humanidade no planeta como agentes inteligentes com objetivos, medos, rotinas e relações.

**Responsabilidades**:
- Soldados: patrulhas, táticas, moral, trauma, deserção
- Mineradores/trabalhadores: rotinas de extração, transporte, reparos
- Administradores/civis: distribuição de recursos, burocracia, pânico
- Economia colonial: produção, consumo, filas, requisições
- Reprints: reativação de clones, penalidades de memória
- Chassis: rastreamento, reparos, falhas, "despertares"

**IA**: HTN + GOAP + sistemas emocionais. Cada NPC tem memória de curto e longo prazo.

### Servidor Inimigos (Hive Server)

**Função**: Simula os Mycelion como superorganismo. Não pensa em indivíduos. Pensa em função, território, ameaça, resposta.

**Responsabilidades**:
- Castas com IA diferenciada por função biológica
- Feromônios/sinais: marca no mundo, invisíveis aos humanos, legíveis aos Mycelion
- Evolução adaptativa: ajustes de geração em tempo real
- Ecologia nativa: ninhos, nutrição, ciclos de criação, conflitos inter-ninho

**Filosofia**: *Não há comando central. Há apenas o jardim, e a resposta imunológica.*

### Protocolo de Comunicação

Todos os servidores se comunicam via bus de eventos. Mensagem universal:

```json
{
  "tick": 1847293,
  "origin": "world|npc|hive",
  "entity_id": "uuid",
  "type": "move|fire|dig|damage|spawn|die|modify_terrain|emit_pheromone",
  "payload": { ... }
}
```

O Servidor Mundo **não lê o campo `origin`**. Um jogador que atira é indistinguível de um NPC ou de um Mycelion. A física é igual para todos.

---

## 7. Temas e Experiência

### O Jogo Pergunta

- É possível deixar de ser "Another No One" em um sistema que te trata como recurso?
- Se você é substituível, o que sobrevive de verdade?
- Você pode ser lembrado por NPCs que não sabem que você já morreu uma vez?
- Os Mycelion são o inimigo, ou são apenas fazendo o mesmo que a humanidade — colonizar?

### Arco Emocional

1. **Desembarque**: Você é um número em uma fila. Ninguém olha para você.
2. **Terror**: Os Mycelion não são "monstros". São um sistema. E você está dentro dele.
3. **Rotina**: A guerra normaliza. Você patrulha, extrai, repara, espera.
4. **Conexão**: Alguns NPCs começam a reagir a você como indivíduo. Isso é reconfortante. Ou aterrorizante.
5. **Crise**: Você morre. E volta. Ou não volta. Ou volta diferente.
6. **Escolha**: Persistir como número? Desertar? Tentar ser alguém? Ser destruído?

---

## 8. Referências Inspiracionais

- Colonização sci-fi militar sombria
- Simulação emergente profunda (mundos que vivem sem o jogador)
- Arquitetura de servidor distribuído como metáfora narrativa
- Biologia de superorganismos (formigas, fungos, corais)
- Economia de guerra e corporações militares privadas
- Questões de identidade em clones, backups, e máquinas conscientes
