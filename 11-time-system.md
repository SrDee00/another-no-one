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

### Jogador Gratuito

- Tem direito a **4 horas de automação offline por dia**
- Para ganhar essas 4 horas, deve primeiro jogar **4 horas conectadas**
- A proporção é **1:1**: cada 10 minutos jogados = 10 minutos de automação offline
- Total máximo de evolução por dia: **8 horas** (4h jogando + 4h automação)
- Se não jogar nada, não ganha automação

| Dia de exemplo | Jogou | Automação disponível | Total evolução |
|----------------|-------|---------------------|----------------|
| Segunda | 2h | 2h | 4h |
| Terça | 4h | 4h | 8h |
| Quarta | 0h | 0h | 0h |
| Quinta | 6h | 4h (capado) | 8h |

### Jogador Pago (Assinatura ou Compra)

- Pode **comprar até 8 horas de automação por dia**
- Não precisa jogar para ter automação — as horas compradas estão disponíveis imediatamente
- Pode usar até **8h de automação + 8h jogando = 16h de presença no mundo**, mas o limite de evolução continua sendo **8h**

| Plano | Automação diária | Custo (referencial) |
|-------|-----------------|---------------------|
| Gratuito | Até 4h (1:1 com horas jogadas) | R$ 0 |
| Básico | +2h de automação comprada | R$ 9,90/mês |
| Padrão | +4h de automação comprada | R$ 19,90/mês |
| Completo | +8h de automação comprada | R$ 29,90/mês |

**Importante**: mesmo pagando, **ninguém evolui mais de 8h por dia**. O pagante só tem mais flexibilidade de quando e como usa essas 8h.

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
