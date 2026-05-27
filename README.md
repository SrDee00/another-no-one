# Another No One — Game Design Documents

> *"You are not the chosen one. You are not even someone. But you can become anything — or cease to exist."*

## Sobre

Another No One é um jogo persistente de ação-tática sci-fi de mundo aberto 2D top-down com simulação emergente global, ambientado na colonização militar de um planeta remoto hostil.

O mundo não é em tempo real. É em **ticks**. A cada intervalo predefinido, o estado do mundo é computado e avança. Jogadores conectam-se, agem dentro de um tick, desconectam-se, e o mundo continua sem eles. Quando retornam, o mundo pode estar irreconhecível.

## Documentos

| # | Documento | O que cobre |
|---|-----------|-------------|
| 01 | [Visão Central](01-vision.md) | Pilares de design, premissa filosófica, identidade do jogo |
| 02 | [O Mundo](02-world.md) | V1C5A302-H, características planetárias, colônia FNA-01, timeline |
| 03 | [Facções](03-factions.md) | AES, estrutura corporativa, hierarquia, outras facções do planeta |
| 04 | [Inimigos](04-enemies.md) | Mycelion, hipótese da rede biológica, castas, biologia, evolução |
| 05 | [O Jogador](05-player.md) | Reprint vs Chassis, diferenças de gameplay, backup neural, despertar |
| 06 | [Renderização](06-render.md) | 2D top-down, camada gráfica indiferente, separação lógica/visual |
| 07 | [Arquitetura de Servidor](07-server-architecture.md) | 3 servidores especializados, protocolos, comunicação, ticks |
| 08 | [Economia e Simulação Viva](08-economy.md) | Economia dinâmica, facções autônomas, escravidão, rotinas de NPCs |
| 09 | [Camadas de Simulação](09-simulation-layers.md) | 5 níveis de abstração, promoção/demosião, escalabilidade |
| 10 | [Persistência Preguiçosa](10-lazy-simulation.md) | Simulação sob demanda, seed determinística, camadas P1-P4 |
| 11 | [Sistema de Tempo](11-time-system.md) | Limite de 8h diárias, automação offline, suspensão segura, gratuito vs pago |
| 12 | [Temas e Experiência](12-themes.md) | Perguntas filosóficas, arco emocional, consequência narrativa |
| 13 | [Referências](13-references.md) | Inspirações, analogias, contexto de design |
| 14 | [Sistemas de Gameplay](14-gameplay-systems.md) | Ferimentos, evolução por prática, peso, sono, fome, desmembramento |

## Convenções

- Nenhuma referência direta a filmes, jogos ou obras externas é citada nos documentos de design.
- A nomenclatura do jogo, facções e entidades são originais ao universo.
- Todos os sistemas são projetados para serem implementáveis e escaláveis.

---

*Última atualização: 2026-05-27*

