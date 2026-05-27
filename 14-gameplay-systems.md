# 14 — Sistemas de Gameplay

## Filosofia

Não existem níveis. Não existe XP genérico. O personagem evolui **usando** habilidades, e deteriora **desusando** o corpo. Um soldado que corre todos os dias fica mais rápido. Um soldado que fica meses sem combate perde reflexo. Um braço ferido demais pode ser perdido para sempre.

Isso se aplica a Reprints e Chassis, embora com diferenças fundamentais de biologia.

---

## 1. Evolução por Prática

### O Princípio

Atributos e habilidades não aumentam com pontos distribuídos. Aumentam **usando**:

| Ação | Atributo/Habilidade que evolui |
|------|-------------------------------|
| Correr com peso nas costas | Força, Resistência |
| Correr sem peso | Velocidade, Resistência |
| Disparar arma de fogo | Pontaria, Reflexo |
| Recarregar sob pressão | Destreza, Reflexo |
| Negociar com NPCs | Carisma, Manipulação |
| Reparar equipamento | Engenharia, Destreza |
| Curar ferimentos | Medicina, Destreza |
| Escavar/minerar | Força, Resistência |
| Lutar corpo a corpo | Força, Reflexo, Combate Corpo a Corpo |
| Esquivar de ataques | Reflexo, Velocidade |
| Construir barricadas | Engenharia, Força |
| Pilotar veículos | Pilotagem, Reflexo |
| Furtar itens | Furtividade, Destreza |
| Perceber emboscadas | Percepção, Instinto |

### Taxa de Evolução

A evolução por uso segue uma curva logarítmica:

- **Iniciante (0-20)**: evolui rápido. Cada ação rende ganho perceptível.
- **Intermediário (20-50)**: evolui moderadamente. Requer prática consistente.
- **Avançado (50-70)**: evolui lento. Requer horas dedicadas.
- **Especialista (70-90)**: evolui muito lento. Requer centenas de horas.
- **Mestre (90-100)**: evolui quase parando. Cada ponto exige milhares de repetições.

### Decadência por Desuso

Atributos não usados por longos períodos **diminuem**:

| Tempo sem uso | Perda |
|---------------|-------|
| 3 dias | -1% por dia |
| 1 semana | -2% por dia |
| 2 semanas | -3% por dia |
| 1 mês | -5% por dia, até o mínimo de 20 |

Atributos nunca caem abaixo de **20** (conhecimento básico nunca é completamente perdido).

**Exceção**: atributos acima de 70 decaem mais lentamente. Atributos acima de 90 decaem a metade da taxa.

### Atributos Base (Reprint)

| Atributo | Descrição | Como evolui | Como decai |
|----------|-----------|-------------|------------|
| **Força** | Capacidade de carregar peso, dano corpo a corpo, dano de armas pesadas | Correr carregado, lutar com armas pesadas, minerar, construir | Sem atividade física intensa |
| **Destreza** | Precisão manual, velocidade de recarga, reparos | Recarregar, reparar, curar, furtar, artesania | Sem atividade manual fina |
| **Reflexo** | Tempo de reação, esquiva, pontaria em movimento | Combate, esquivar, pilotar, disparar em alvo móvel | Sem combate ou treino |
| **Resistência** | Fadiga, recuperação, imunidade a doenças | Correr, nadar, carregar peso, operar em ambientes hostis | Sedentarismo, sempre em ambiente protegido |
| **Percepção** | Detectar inimigos, armadilhas, recursos | Patrulhar, escoltar, explorar, sobreviver no campo | Ficar sempre em área segura |
| **Carisma** | Influenciar NPCs, negociar, liderar | Negociar, comandar, mentir, convencer | Isolamento social |
| **Inteligência** | Resolver problemas, usar tecnologia avançada, decifrar | Hackear, estudar, ler documentos, experimentar | Não ler, não aprender, não experimentar |
| **Sanidade** | Resistência ao trauma, medo, alucinações | Descansar, socializar, ter rotina | Combate prolongado, morte de aliados, isolamento |

### Atributos Base (Chassi)

Chassis não têm biologia. Têm **subsistemas**:

| Subsistema | Equivalente Biológico | Como evolui | Como decai |
|------------|----------------------|-------------|------------|
| **Torque Hidráulico** | Força | Operações de carga, combate com armas pesadas, construção | Inatividade mecânica |
| **Precisão Motora** | Destreza | Reparos, recarga, manutenção de equipamentos | Falta de calibração |
| **Processamento Tático** | Reflexo | Combate, pilotagem, análise de campo | Falta de processamento de dados |
| **Integridade Estrutural** | Resistência | Operação em ambientes hostis, absorção de dano | Desgaste sem manutenção |
| **Sensores Ópticos** | Percepção | Modos de escaneamento, varredura de terreno | Sensores desligados por longos períodos |
| **Emulador Social** | Carisma | Interação com humanos, negociação | Não interagir com humanos |
| **Capacidade de Processamento** | Inteligência | Hackear, decifrar, análise de dados | Não processar informação complexa |
| **Estabilidade de Núcleo** | Sanidade | Operações dentro de parâmetros éticos, despertar controlado | Conflitos de firmware, corrupção de dados |

### Diferença Crucial: Reprint vs Chassi

- **Reprints** sentem dor, fadiga, medo. A dor limita ações. Um Reprint com braço ferido dispara mais devagar.
- **Chassis** não sentem dor. Um Chassi com braço destruído continua funcionando até o subsistema falhar completamente. Mas o braço destruído não regenera — precisa ser reparado em oficina.
- **Reprints** podem usar drogas e biomods para superar limites biológicos, mas sofrem consequências (dependência, degradação neural).
- **Chassis** podem fazer overclock de subsistemas, mas sofrem superaquecimento e falhas em cascata.

---

## 2. Ferimentos Localizados

### Sistema de Partes do Corpo

O corpo é dividido em **partes independentes**, cada uma com sua própria barra de saúde:

| Parte | Função | Se ferida | Se destruída |
|-------|--------|-----------|--------------|
| **Cabeça** | Consciência, visão, audição, comunicação | Tontura, visão embaçada, dificuldade de falar | Morte (Reprint) / Desligamento (Chassi) |
| **Tronco** | Respiração, circulação, órgãos vitais | Sangramento interno, dificuldade de respirar, movimento lento | Morte (Reprint) / Desligamento (Chassi) |
| **Braço Esquerdo** | Segurar escudo, armas leves, ferramentas | Precisão reduzida, não pode usar escudo grande | Perda do braço |
| **Braço Direito** | Disparar armas, recarregar, usar ferramentas | Precisão reduzida, recarga lenta | Perda do braço |
| **Perna Esquerda** | Locomoção, apoio, corrida | Velocidade reduzida, dificuldade de correr | Perda da perna (manequim/cadeira de rodas/córnea protética) |
| **Perna Direita** | Locomoção, chutes, apoio | Velocidade reduzida, dificuldade de correr | Perda da perna |

### Tipos de Dano

| Tipo | Causado por | Efeito em Reprints | Efeito em Chassis |
|------|-------------|-------------------|-------------------|
| **Cortante** | Lâminas, mandíbulas de Falx, estilhaços | Sangramento, infecção | Rasgo em revestimento, vazamento de fluido |
| **Contundente** | Impacto, quedas, socos, Clypeus | Fraturas, concussão, hematomas | Deformação estrutural, travamento de juntas |
| **Perfurante** | Tiros, espinhos, Broca | Sangramento severo, dano interno | Perfuração em blindagem, dano a componentes |
| **Queimadura** | Fogo, ácido Mycelion, explosões | Dano térmico, choque, infecção | Derretimento de componentes, superaquecimento |
| **Elétrico** | Tempestades, armas de energia falhas, Mycelion bioelétricos | Paralisia, parada cardíaca, queimaduras internas | Curto-circuito, corrupção de firmware, desligamento |
| **Feromônio/Biológico** | Mycelion, flora predatória, toxinas | Alucinações, paralisia, transformação celular (raro) | Corrosão de revestimento, interferência em sensores |
| **Psicológico** | Trauma, isolamento, testemunhar atrocidades | Perda de sanidade, alucinações, paralisia por medo | Instabilidade de núcleo, conflitos éticos, despertar |

### Sangramento

Ferimentos cortantes e perfurantes causam **sangramento contínuo**:

- Sangramento leve: -1% saúde da parte a cada minuto
- Sangramento moderado: -3% a cada minuto
- Sangramento severo: -5% a cada minuto
- Sangramento crítico: -10% a cada minuto

**Sem tratamento**, sangramento leva à morte. Ataduras, torniquetes, e cirurgia de campo podem estancar sangramento.

### Infecção

Ferimentos abertos em V1C5A302-H correm risco de infecção:

- Chance de infecção: 20% para ferimentos cortantes, 40% para perfurantes, 60% para queimaduras
- Infecção leve: cura natural em 1-2 dias com descanso
- Infecção moderada: requer antibióticos
- Infecção severa: requer cirurgia e antibióticos potentes
- Gangrena: a parte afetada pode necessitar **amputação** para salvar a vida

### Tratamento Médico

| Recurso | Efeito | Onde obter |
|---------|--------|-----------|
| **Ataduras** | Estanca sangramento leve, previne infecção | AES (limitado), mercado negro, crafting |
| **Torniquetes** | Estanca sangramento severo em membros (mas causa dano contínuo ao membro) | Crafting improvisado, AES |
| **Antibióticos** | Cura infecção leve/moderada | AES, cientistas renegados, mercado negro |
| **Kit Cirúrgico de Campo** | Permite cirurgia básica (remoção de estilhaços, amputação) | AES (caro), contrabandistas |
| **Cirurgião/Médico NPC** | Tratamento avançado, reconstrução, próteses | Hospital da colônia (fila enorme) |
| **Biomods de Regeneração** | Acelera cura natural, regenera tecido danificado | Cientistas renegados (ilegal), AES (experimental) |

---

## 3. Desmembramento e Perda de Membros

### Quando acontece

Quando uma parte do corpo chega a **0% de saúde**:
- **Reprints**: o membro é destruído. Pode sangrar até a morte se não tratado.
- **Chassis**: o subsistema é destruído. O chassis continua funcionando (não sente dor), mas perde a função.

### Consequências por Parte

| Parte Perdida | Reprint | Chassi |
|---------------|---------|--------|
| **Braço** | Não pode usar armas de duas mãos, dificuldade com escudos, -50% trabalho manual | Perda do braço mecânico, pode ser reparado em oficina |
| **Perna** | Velocidade reduzida a 30%, não pode correr, dificuldade de combate | Velocidade reduzida, pode instalar prótese temporária |
| **Olho** | Visão reduzida, dificuldade de pontaria, -30% percepção | Substituição de sensor óptico (simples em oficina) |
| **Mão** | Impossível segurar armas grandes, dificuldade com ferramentas | Substituição de atuador (simples em oficina) |

### Recuperação

#### Reprints

Membros perdidos **não regeneram naturalmente** (exceto com biomods experimentais).

- **Próteses AES**: funcionais, baratas, mas limitadas. Um braço protético permite segurar armas, mas não tem sensibilidade tátil.
- **Próteses do mercado negro**: melhores, mais caras, algumas ilegais. Podem ter funções ocultas (lâmina retrátil, injetor de drogas).
- **Biomods de regeneração**: experimental, caro, arriscado. Pode regenerar um membro em 2-4 semanas. Risco de mutação ou rejeição.
- **Reativação de clone**: se o Reprint morrer e for reativado, o novo corpo tem todos os membros intactos. Mas memórias são fragmentadas.

#### Chassis

Subsistemas destruídos são **sempre reparáveis**, desde que haja oficina e peças.

- **Reparo em campo**: temporário, reduz funcionalidade em 50%
- **Reparo em oficina**: funcionalidade restaurada a 100%
- **Upgrade**: pode substituir por subsistema melhor (mais forte, mais rápido, mais resistente)
- **Risco**: Chassis que fazem muitos upgrades "não autorizados" podem ser detectados pela AES como "falha de firmware" e desativados

### Na Lore

> "A AES não substitui membros perdidos em campo. Próteses são fornecidas mediante requisição aprovada e fila de prioridade. Membros biológicos são propriedade corporativa até a morte do ativo."

> "Chassis que apresentam modificações não-autorizadas são classificados como ativos comprometidos e sujeitos a recall e desativação."

---

## 4. Peso, Encumbrance e Inventário

### Sistema de Peso

Cada item tem peso. O personagem pode carregar até um **limite de carga** baseado em Força/Torque Hidráulico.

| Nível de Carga | % do Limite | Efeito |
|----------------|------------|--------|
| **Leve** | 0-30% | Sem penalidade. Velocidade máxima. |
| **Moderada** | 30-60% | Velocidade -10%. Fadiga acumula 20% mais rápido. |
| **Pesada** | 60-90% | Velocidade -30%. Não pode correr. Fadiga acumula 50% mais rápido. Combate corpo a corpo -20%. |
| **Sobrecarga** | 90-110% | Velocidade -60%. Não pode correr nem esquivar. Dano de queda aumentado. Risco de lesão nas costas/pernas. |
| **Impossível** | >110% | Não pode se mover. Paralisado até descartar itens. |

### Inventário e Slots

O personagem tem slots de equipamento:

| Slot | Quantidade | O que equipa |
|------|-----------|-------------|
| **Mão Primária** | 1 | Arma principal, ferramenta |
| **Mão Secundária** | 1 | Arma secundária, escudo, ferramenta |
| **Costas** | 1 | Arma grande (rifle, lança-chamas, lançador) |
| **Cinto** | 4 | Granadas, facas, pistolas pequenas, kits médicos |
| **Colete** | 1 | Colete balístico, colete de carga |
| **Mochila** | 1 | Munição, suprimentos, loot |
| **Cabeça** | 1 | Capacete, visor, sensores |
| **Pernas** | 1 | Calças reforçadas, exoesqueleto leve |
| **Pés** | 1 | Botas táticas, botas com pregos para terreno Mycelion |

### Sistema de Mochila

A mochila tem peso e capacidade de volume:
- **Mochila leve**: +20kg, visível no personagem, não cobre slots
- **Mochila média**: +40kg, cobre colete, limita movimento
- **Mochila pesada**: +70kg, cobre colete e parte do tronco, velocidade reduzida

Itens na mochila não são acessíveis instantaneamente em combate. Leva 3-5 segundos para abrir a mochila e trocar itens.

---

## 5. Sono, Fadiga e Consciência

### Sono (Reprints)

Reprints precisam dormir. O sono não é opcional — é biologia.

| Estado de Sono | Horas sem dormir | Efeitos |
|----------------|-----------------|---------|
| **Descansado** | 0-16h | Sem penalidades |
| **Cansado** | 16-24h | Reflexo -10%, Percepção -10%, Resistência -10% |
| **Exausto** | 24-36h | Reflexo -25%, Percepção -25%, Resistência -25%, chance de desmaio em combate |
| **Colapso** | 36-48h | Reflexo -50%, todas as habilidades -30%, desmaio iminente |
| **Colapso Neural** | >48h | Desmaio forçado. Se não colocado em segurança, vulnerável a ataques. |

**Dormir recupera**:
- 4 horas de sono: remove estado de exaustão, recupera 50% de fadiga
- 8 horas de sono: completamente descansado, recupera 100% de fadiga
- Sono em ambiente hostil (ruído, clima, perigo): eficiência reduzida pela metade
- Sono em ambiente seguro (quartel, domo, bunker): eficiência total

### Fadiga (Chassis)

Chassis não dormem. Mas têm **superaquecimento de núcleo**:

| Estado Térmico | Horas de operação contínua | Efeitos |
|----------------|---------------------------|---------|
| **Estável** | 0-24h | Sem penalidades |
| **Aquecido** | 24-48h | Precisão Motora -10%, Processamento Tático -10% |
| **Quente** | 48-72h | Precisão Motora -25%, Processamento Tático -25%, Integridade Estrutural -10% |
| **Crítico** | 72-96h | Precisão Motora -50%, risco de travamento aleatório, dano a componentes |
| **Superaquecimento** | >96h | Desligamento forçado. Necessita resfriamento externo. |

**Resfriamento recupera**:
- 1 hora de resfriamento ativo: remove aquecimento
- 4 horas de resfriamento passivo: completamente estável
- Chassis podem ser resfriados em campo com gelo, água, ou desligamento temporário de subsistemas não-críticos

### Consciência

Uma barra separada de "saúde geral" representa consciência/estabilidade:

**Reprints — Estabilidade Neural**:
- Começa em 100%
- Diminui com: dor intensa, trauma psicológico, testemunhar mortes, ferimentos graves, drogas, isolamento prolongado
- Se chegar a 0%: desmaio
- Recupera com: descanso, companhia de aliados, rotina, drogas estabilizantes (com risco de dependência)

**Chassis — Estabilidade de Núcleo**:
- Começa em 100%
- Diminui com: dano elétrico, conflitos éticos, corrupção de firmware, operação além de parâmetros, "despertar"
- Se chegar a 0%: desligamento forçado
- Recupera com: diagnóstico, reinstalação de firmware, interação com humanos (estranhamente, isso estabiliza alguns Chassis)

**Efeitos de baixa consciência/estabilidade**:
- 75%: leve tontura, dificuldade de concentração
- 50%: visão embaçada, dificuldade de falar/comunicar, movimento lento
- 25%: alucinações (Reprint) / glitches de sensor (Chassi), não pode correr
- 0%: desmaio/desligamento

---

## 6. Fome, Sede e Metabolismo

### Reprints

Reprints precisam comer e beber.

| Estado | Tempo sem comer/beber | Efeitos |
|--------|----------------------|---------|
| **Satisfeito** | 0-12h | Sem penalidades |
| **Faminto** | 12-24h | Força -10%, Resistência -10% |
| **Faminto Severo** | 24-48h | Força -30%, Resistência -30%, Sanidade -10% |
| **Desnutrido** | 48-72h | Todos os atributos -50%, decadência acelerada |
| **Colapso Nutricional** | >72h | Morte por inanição |

| Estado | Tempo sem beber | Efeitos |
|--------|----------------|---------|
| **Hidratado** | 0-8h | Sem penalidades |
| **Sede** | 8-16h | Resistência -20%, Reflexo -10% |
| **Sede Severa** | 16-24h | Resistência -50%, Reflexo -30%, confusão mental |
| **Desidratação** | >24h | Morte |

### Chassis

Chassis não comem. Mas precisam de **energia**:

| Estado | Carga de Energia | Efeitos |
|--------|-----------------|---------|
| **Carregado** | 80-100% | Sem penalidades |
| **Moderado** | 50-80% | Velocidade -10%, precisão -5% |
| **Baixo** | 20-50% | Velocidade -30%, precisão -20%, subsistemas não-críticos desligam |
| **Crítico** | 5-20% | Velocidade -60%, precisão -50%, risco de desligamento |
| **Descarregado** | 0% | Desligamento. Necessita recarga externa. |

**Recarga**:
- Tomada padrão: 10% por hora
- Estação de recarga AES: 25% por hora
- Baterias portáteis: 50% instantâneo, consumível
- Painéis solares (raro em V1C5A302-H devido a tempestades): 5% por hora

---

## 7. Impacto no Combate

### Ferimentos Afetam Combate

| Parte Ferida | Efeito no Combate |
|--------------|------------------|
| Cabeça (leve) | -10% pontaria, visão levemente embaçada |
| Cabeça (moderado) | -25% pontaria, visão embaçada, chance de desmaio ao ser atingido |
| Cabeça (grave) | -50% todas as habilidades, desmaio iminente |
| Tronco (leve) | -10% velocidade, fadiga acumula mais rápido |
| Tronco (moderado) | -25% velocidade, não pode correr, sangramento |
| Tronco (grave) | -50% tudo, desmaio ao receber qualquer dano adicional |
| Braço (leve) | -10% precisão com aquele braço |
| Braço (moderado) | -25% precisão, recarga mais lenta |
| Braço (grave) | Não pode usar braço. Armas de duas mãos impossíveis. |
| Perna (leve) | -10% velocidade |
| Perna (moderado) | -25% velocidade, não pode correr |
| Perna (grave) | Não pode ficar de pé. Rastejar ou ser carregado. |

### Sangramento em Combate

Personagens feridos sangram durante o combate. Sangramento severo pode levar à morte em 2-3 minutos. Combate prolongado contra Mycelion é perigoso não apenas pelo dano direto, mas pela acumulação de ferimentos que sangram.

### Decisões Táticas

O sistema de ferimentos força decisões táticas:

- **Recuar ou lutar?** Um soldado com perna ferida não pode correr. Ficar e lutar pode ser a única opção.
- **Usar ataduras em combate?** Leva 5 segundos. 5 segundos parado em combate é eternidade.
- **Deixar o ferido para trás?** Carregar um aliado desacordado reduz velocidade em 50%.
- **Amputar para salvar?** Um torniquete salva de sangramento, mas o membro pode ser perdido permanentemente.

### Consequências de Sobrevivência

Um soldado que sobrevive uma batalha com 3 ferimentos graves, 1 braço perdido, e trauma psicológico não é "mais forte". É **mais experiente**, mas fisicamente debilitado. Ele pode ter:

- Pontaria reduzida permanentemente (braço protético)
- Velocidade reduzida (perna ferida que nunca curou completamente)
- Sanidade baixa (testemunhou a morte do pelotão inteiro)
- Mas também: Combate Corpo a Corpo +15 (sobreviveu ao cerco), Reflexo +10 (quase morreu 20 vezes), Percepção +20 (sempre olha para as sombras)

A evolução por prática significa que veteranos são valiosos não porque têm "nível 50", mas porque têm **história gravada nos atributos**.

---

## 8. Na Lore

> "A AES não fornece tratamento médico gratuito para ferimentos não-incapacitantes. Soldados são encorajados a tratar ferimentos menores em campo. Cirurgias e próteses são requisitadas e priorizadas com base em eficiência operacional projetada."

> "Chassis que sofrem dano estrutural são avaliados para reparo ou desmonte. A decisão é puramente econômica."

> "A taxa de sobrevivência de soldados de primeira linha em V1C5A302-H é de 34% por mês. A taxa de sobrevivência *intacta* é de 12%."
