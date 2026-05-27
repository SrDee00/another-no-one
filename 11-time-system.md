# 11 — Sistema de Tempo, Automação e Limitação de Progressão

## O Princípio

Another No One é um jogo persistente que roda 24 horas por dia, mas **nenhum jogador pode progredir indefinidamente**. A evolução de cada personagem é limitada a **8 horas de atividade efetiva por dia**.

Isso equilibra jogadores que podem jogar o dia todo com jogadores que trabalham e só têm poucas horas livres.

## As Duas Modalidades de Atividade

| Modalidade | Descrição | Conta para o limite? |
|------------|-----------|---------------------|
| **Atividade Direta** | Jogador conectado, controlando o personagem em tempo real | Sim |
| **Automação Offline** | Personagem executa lista de tarefas predefinida enquanto jogador está offline | Sim, até o limite diário |
| **Suspensão Segura** | Personagem em ambiente protegido sem atividade | Não |

## Suspensão Segura

Quando um jogador desconecta-se, o personagem permanece no mundo como entidade inerte.

Para estar seguro durante a ausência, o jogador deve colocá-lo em um **ambiente de suspensão segura**:
- Quartel da AES com guardas
- Domo pressurizado funcional
- Bunker ou abrigo fortificado
- Veículo blindado estacionado

Se o personagem for desconectado em campo aberto, ele permanece vulnerável. Mycelion podem encontrá-lo. Desertores podem roubá-lo. A tempestade pode matá-lo. Quando o jogador reconecta, pode encontrar um cadáver.

**Na lore**: a AES não garante segurança fora de instalações autorizadas.

## Lista de Tarefas (Automação Offline)

O jogador pode deixar uma **lista de afazeres** para o personagem executar enquanto está offline.

### Como funciona

1. Jogador conecta-se, joga normalmente
2. Antes de desconectar, abre a interface de lista de tarefas
3. Define até 10 ações sequenciais ou condicionais:
   - "Patrulhar setor B por 2 horas"
   - "Se encontrar Mycelion, retornar ao quartel"
   - "Minerar cristais na Mina Alpha enquanto moral > 30%"
   - "Reparar barricadas nas posições designadas"
   - "Escoltar comboio de suprimentos até o Ponto de Pouso"
4. O personagem executa essas tarefas via IA do Servidor NPCs
5. O jogador reconecta e recebe um **relatório de atividade**

### Limitações da automação

- Personagem em automação tem IA limitada. Não pode improvisar estratégias complexas, negociar, ou tomar decisões morais.
- Se uma tarefa falha, o personagem tenta a próxima ou retorna ao ponto seguro.
- Automação em áreas hostis é perigosa. O personagem pode morrer enquanto o jogador dorme.

## O Limite Diário de 8 Horas

Cada personagem tem um **cronômetro de atividade efetiva** que reseta a cada 24 horas.

| Atividade | Consome do limite? |
|-----------|-------------------|
| Jogar conectado (movimento, combate, comércio) | Sim, tempo real |
| Automação offline (lista de tarefas em execução) | Sim, tempo real |
| Suspensão segura (dormindo em quartel) | Não |
| Morte e espera por reativação | Não |
| Conectado mas parado em área segura (AFK) | Não, desde que sem atividade |

Quando o cronômetro atinge 8 horas:
- O personagem **pode continuar jogando** normalmente
- Mas toda **progressão para de contar**: XP, créditos, reputação, habilidades, loot — nada avança
- O personagem ainda pode morrer, perder equipamento, e sofrer consequências
- O mundo continua evoluindo ao redor dele, mas ele não evolui com ele

**Na lore**: "jornada de eficiência neural de 8 horas por ciclo de 24 horas" — a própria AES impõe o limite como cláusula contratual.

## Distribuição de Horas: Gratuito vs. Pago

### O Limite Único

Todos os jogadores — gratuitos ou pagos — têm o mesmo limite: **8 horas de evolução por dia**. Não existe forma de progredir além desse teto.

A diferença está em **como** essas 8 horas são consumidas:

| Tipo | Horas Manuais (jogando) | Horas Automáticas (offline) | Total de Evolução |
|------|------------------------|---------------------------|-------------------|
| **Gratuito** | Até 4h | Até 4h (desbloqueadas jogando) | **8h máximo** |
| **Pago** | Até 8h | Até 8h (disponíveis imediatamente) | **8h máximo** |

### Jogador Gratuito

- Pode jogar até **4 horas** manualmente conectado
- Após jogar 4h, desbloqueia **4 horas de automação offline**
- **Não pode usar automação sem antes jogar as 4h**
- Total máximo de evolução: **8 horas** (4h manual + 4h automação)
- Se não jogar nada no dia, não ganha automação e não evolui

| Dia de exemplo | Jogou Manual | Automação Usada | Total Evolução |
|----------------|-------------|-----------------|----------------|
| Segunda | 2h | 0h (ainda não desbloqueou) | 2h |
| Terça | 4h | 4h (desbloqueadas) | 8h |
| Quarta | 0h | 0h | 0h |
| Quinta | 6h | 0h (limite manual atingido, sem automação desbloqueada porque já passou de 4h? Não — pode usar as 4h automação, mas total não passa 8h) | 8h |

**Fluxo gratuito**:
1. Jogador conecta e joga manualmente
2. Cronômetro de manual avança (máx 4h)
3. Ao atingir 4h manual, desbloqueia 4h de automação
4. Jogador pode desconectar e deixar personagem em automação
5. Automação consome até 4h do limite diário
6. Total combinado nunca passa 8h

### Jogador Pago (Assinatura)

- Tem **8 horas de automação disponíveis imediatamente todo dia**, sem precisar jogar antes
- Pode usar as 8h inteiras como automação offline (dormir, trabalhar, e o personagem evolui)
- Ou pode jogar manualmente algumas horas e complementar com automação
- Ou pode jogar as 8h manualmente e não usar automação
- **O total de evolução continua sendo 8h**, não importa a proporção

| Plano | Automação Diária | Como Funciona | Custo (referencial) |
|-------|-----------------|---------------|---------------------|
| **Gratuito** | Até 4h (desbloqueadas após 4h manual) | Jogue 4h → ganhe 4h de automação | R$ 0 |
| **Pago** | Até 8h (disponíveis imediatamente) | Use 8h como quiser, manual ou automático | R$ 19,90/mês |

**Importante**: 
- **Ninguém evolui mais de 8h por dia**, independente de pagar ou não.
- O pagante não compra XP. Compra **conveniência** — a liberdade de usar as 8h como automação sem precisar jogar primeiro.
- Um jogador pago que joga 8h manualmente não tem vantagem de XP sobre um gratuito que joga 4h + 4h automação. Ambos evoluíram 8h.

### Exemplo Comparativo

**Jogador Gratuito — Operário**:
> **06:00** — Acorda, conecta, joga 2h antes do trabalho. (2h manual)
> **08:00** — Vai trabalhar. Desconecta sem atingir 4h manual. Sem automação desbloqueada.
> **20:00** — Volta do trabalho. Conecta, joga mais 2h. (4h manual total — automação desbloqueada!)
> **22:00** — Coloca personagem em automação: "Minerar Mina Alpha, retornar se atacado."
> **02:00** — Automação consome 4h. Chega ao limite diário de 8h.
> Personagem entra em suspensão segura.
> **Total**: 4h manual + 4h automação = **8h de evolução**

**Jogador Pago — Executivo**:
> **07:00** — Vai trabalhar. Antes de sair, conecta 5 minutos e coloca personagem em automação: "Patrulhar setor B."
> **07:05** — Desconecta. Personagem em automação consome 8h ao longo do dia.
> **19:00** — Volta do trabalho. Reconecta. Relatório: 8h de automação completadas.
> **19:00 - 23:00** — Joga 4h manualmente por diversão, explorando, conversando com NPCs.
> Mas evolução já atingiu 8h. Essas 4h manuais **não contam para XP** — só para diversão e consequências.
> **Total**: 0h manual evolutiva + 8h automação = **8h de evolução**

**Jogador Pago — Hardcore**:
> Joga 8h manualmente de forma intensa.
> Não usa automação.
> **Total**: 8h manual + 0h automação = **8h de evolução**
> Mesmo resultado de XP que o gratuito e o executivo. Só teve mais controle direto.

### O que acontece após 8 horas

- Personagem **continua jogando normalmente**
- Mas **nada conta para evolução**: XP, créditos, reputação, habilidades, loot — tudo congela
- Ainda pode morrer, perder equipamento, e sofrer consequências
- Ainda pode explorar, socializar, e afetar o mundo
- O mundo continua evoluindo ao redor dele, mas ele não evolui com ele
- No dia seguinte (reset do cronômetro), evolução volta a contar

### Na Lore

> "O contrato AES estabelece uma jornada de eficiência neural de 8 horas por ciclo de 24 horas. Exceder esse limite causa degradação de desempenho, perda de memória de curto prazo, e risco de colapso neural. A corporação não autoriza — e não paga por — atividade além desse limite."

Para Reprints: o clone entra em "modo de manutenção" após 8h.
Para Chassis: o núcleo atinge "sobrecarga térmica de processamento".

A limitação não é uma barreira externa imposta pelo jogo. É uma cláusula contratual da AES, com justificativa biológica e técnica dentro do universo.

## Consequências de Design

- **Fairness**: quem trabalha 10h por dia pode deixar o personagem em automação durante o dia e jogar à noite, chegando aos 8h de evolução
- **Estratégia**: jogadores precisam planejar suas listas de tarefas. Automação em mina segura é lucrativa. Automação em linha de frente é suicídio
- **Economia**: horas de automação compradas são um recurso valioso. Podem ser vendidas no mercado negro
- **Comunidade**: guildas e pelotões podem coordenar automações para cobertura 24h
- **Consequência de morte**: se um personagem morre durante automação, o jogador perdeu horas de evolução sem estar presente

## Exemplo de Dia de um Jogador Trabalhador

> **07:00** — Jogador conecta 15 minutos antes de sair para o trabalho. Coloca o personagem em automação: "Patrulhar corredor entre Mina Alpha e Quartel. Se atacado, retornar."
> 
> **07:15** — Jogador desconecta. Personagem patrulha via automação. Consome 7h45min do limite diário.
> 
> **19:00** — Jogador volta do trabalho. Reconecta. Relatório: patrulha completada com sucesso. 2 encontros com Falx evitados. 150 créditos ganhos. Moral -5%.
> 
> **19:00 - 23:00** — Jogador joga 4 horas conectadas. Missões de escolta, combate, e comércio no mercado negro.
> 
> **23:00** — Jogador coloca personagem em suspensão segura no quartel. Não consome mais do limite.
> 
> **Total do dia**: 7h45min automação + 4h jogando = 11h45min no mundo, mas só 8h contaram para evolução.

