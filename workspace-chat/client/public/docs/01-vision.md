# 01 — Visão Central

## Another No One

Another No One é um jogo persistente de ação-tática sci-fi de mundo aberto 2D top-down com simulação emergente global, ambientado na colonização militar de um planeta remoto hostil.

O jogador não é o escolhido. É um ativo descartável enviado para uma frente de guerra que devorou milhares antes dele.

> *"You are not the chosen one. You are not even someone. But you can become anything — or cease to exist."*

## Pilares de Design

1. **Mundo Persistente e Autônomo**: O planeta avança em ticks independente de jogadores. Economia, facções, comércio, escravidão, guerras — tudo evolui sozinho, 24 horas por dia.

2. **Substituibilidade**: Cada morte consome recursos. Morrer demais = fim da existência.

3. **Arquitetura em Camadas**: O jogo roda em servidores especializados que não se conhecem — assim como ninguém no jogo conhece o jogador.

4. **Camada Gráfica Indiferente**: O servidor de mundo não sabe que existe gráfico. O render é apenas um cliente que consome estado. O visual pode ser totalmente alterado sem tocar na lógica.

5. **Ticks Múltiplos**: Diferentes sistemas operam em frequências diferentes. Física a cada 10 segundos. Economia a cada 5 minutos. Eventos globais a cada 15 minutos. Ecologia a cada hora.

6. **Simulação Sob Demanda**: Entidades distantes não são simuladas continuamente. Quando consultadas, o estado atual é calculado deterministicamente a partir do último snapshot + regras do jogo.

7. **Ausência de Narrativa Linear**: Não existe "história principal". Existe apenas a guerra, a extração, e a sobrevivência.

8. **Limitação de Progressão**: Nenhum jogador pode evoluir mais de 8 horas por dia. O mundo não espera, mas o personagem tem limites biológicos e contratuais.

## O Conceito de "No One"

O título não é apenas nome. É mecânica, é lore, é filosofia:

- Você é literalmente "mais um" na fila de soldados descartáveis
- A corporação não sabe seu nome. Sabe seu número de série.
- Se você morrer, outro assume seu lugar. Ninguém nota.
- Se você sobreviver... o que muda? Você ainda é um número.
- A pergunta do jogo: **é possível deixar de ser "Another No One" em um sistema que te trata como recurso?**

## Identidade Visual e Tom

- **Visual**: 2D top-down, escala tática, interface operacional militar
- **Tom**: Sombrio, pragmático, melancólico sem ser melodramático
- **Áudio**: Ambiente industrial, rádio estática, vozes distantes, silêncio de tempestade
- **Texto**: Documentos militares, contratos, relatórios de campo, diálogos curtos

## Escopo

- **Plataforma**: PC (primário), potencial para mobile como cliente secundário
- **Modelo**: Free-to-play com monetização de automação offline e cosméticos
- **Servidores**: Persistente, sempre online, múltiplos shards por região
- **Jogadores por shard**: 100-500 simultâneos, mundo compartilhado
