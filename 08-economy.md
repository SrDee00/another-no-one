# 08 — Economia e Simulação de Mundo Vivo

## O Princípio

O servidor de simulação não é um jogo de "missões e spawns". É um **mundo autônomo** onde entidades têm vidas, necessidades, objetivos, e conflitos.

## Economia Viva

A economia de V1C5A302-H não é uma loja com preços fixos. É um sistema dinâmico:

| Componente | Funcionamento |
|------------|---------------|
| **Oferta e Demanda** | Cristais de fase extraídos aumentam oferta; rotas interrompidas por Mycelion reduzem oferta. Preços flutuam em tempo real. |
| **Escassez de Suprimentos** | Comida, munição, medicamentos, combustível vêm de fora do planeta. Naves de suprimento têm calendários. Se uma nave é destruída, a colônia sente em semanas. |
| **Comércio Interno** | Soldados compram de contrabandistas. Mineradores vendem minerais extras no mercado negro. Administradores desviam recursos. |
| **Inflação e Colapso** | Se a produção de cristais para, a AES corta reforços. Sem reforços, a Security perde território. Sem território, as minas fecham. Espiral de morte. |
| **Créditos e Dívida** | Reprints ganham créditos por missões, mas pagam pela própria reativação. Alguns terminam como escravos de dívida da AES. |

## Facções Autônomas

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

Facções **entram em guerra entre si** sem avisar o jogador.

## Rotinas e Vidas dos NPCs

Cada NPC humano no planeta tem uma vida completa:

- **Horário**: dorme, acorda, trabalha, come, socializa, patrulha, descansa
- **Necessidades**: fome, sede, sono, moral, medo, saúde, sanidade
- **Relacionamentos**: ama, odeia, confia, trai, protege, vinga
- **Ambição**: quer subir de cargo, acumular créditos, desertar, ou apenas sobreviver
- **Memória**: lembra de quem o ajudou, quem o roubou, quem morreu ao lado dele
- **Morte**: quando um NPC morre, ele é removido do mundo. Outro pode ser enviado como substituto — ou não.

NPCs agem mesmo quando o jogador está do outro lado do planeta. Um minerador pode decidir desertar à noite. Um soldado pode assassinar um oficial por vingança. Um contrabandista pode negociar com desertores. Tudo isso acontece em ticks, continuamente.

## Sistema de Escravidão e Servidão

A AES não usa o termo "escravidão". Usa "contratos de indentura", "dívida operacional", e "reação de serviço compulsório".

- **Reprints endividados**: soldados que morreram demais e não conseguem pagar a reativação são colocados em "programas de recuperação de custo" — trabalho forçado em minas perigosas até a dívida zerar (nunca zera).
- **Prisioneiros de guerra**: desertores capturados pela AES são "reclassificados" como mão de obra penal.
- **Chassis reaproveitados**: androides danificados que a AES decide não reparar são vendidos para contrabandistas.

O jogador pode:
- **Liberar escravos** (tornando-se inimigo da AES)
- **Comprar escravos** (tornando-se parte do sistema)
- **Ignorar** (a maioria faz isso)
- **Ser capturado** (Reprints endividados podem ser "reclassificados" em campo)

## Escala Global

O planeta inteiro é simulado, não apenas a área ao redor do jogador:

- **Múltiplas colônias**: FNA-01 é a maior, mas existem outras instalações menores
- **Rotas de suprimento**: naves aterrissam em intervalos regulares. Se a zona é tomada, nenhuma nave pousa.
- **Comunicação de longa distância**: rádio tem alcance limitado. Notícias chegam com delay, ou não chegam.
- **Eventos globais**: uma praga em uma colônia pode se espalhar. Uma revolta pode inspirar desertores.
