# 06 — Renderização e Perspectiva

## 2D Top-Down

O jogo é apresentado em **perspectiva top-down 2D**. Visão isométrica ou ortogonal pura. O jogador vê o mundo de cima, como um mapa operacional tático, mas com profundidade suficiente para ler terreno, cobertura, e movimento de tropas.

### Vantagens da Perspectiva

- Leitura clara de formações de batalha e movimento de swarms
- Interface limpa para gestão de recursos e informação tática
- Escalabilidade visual — o mesmo engine pode renderizar 1 soldado ou 500
- Baixo custo de produção de assets, permitindo foco em simulação
- Compatível com múltiplos dispositivos (PC, tablet, terminal)

## Camada Gráfica Indiferente (Render Layer)

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

## O que o Servidor Mundo emite

- Posições de entidades (x, y, z, ângulo, velocidade)
- Estados de terreno (modificado, destruído, construído)
- Eventos de física (explosão em X,Y, dano em entidade #UUID)
- Estados de entidades (vivo, morto, ferido, operando máquina)

## O que o Cliente Render decide

- Qual sprite/textura usar para cada entidade
- Como animar uma transição de movimento
- Quais efeitos visuais aplicar sobre um evento
- Zoom, câmera, filtros de UI, minimapa
- Efeitos de iluminação, partículas, sombras

## Por que isso é possível

O servidor simula. O cliente desenha. Se amanhã você quiser mudar de 2D top-down para 3D isométrico ou até first-person, o servidor de mundo permanece **intacto**. Apenas o cliente render muda.

Isso é exatamente como sistemas de simulação profissionais e jogos modernos de escala operam.

## Benefícios Práticos

- **Múltiplos clientes visuais** podem coexistir (modo tático top-down para PC, interface minimapa para mobile, visualização 3D para espectadores)
- **Testes de servidor sem gráfico** — você pode rodar o mundo em um terminal sem GPU
- **Replays determinísticos** — grave o stream de estado do servidor e reproduza em qualquer cliente
- **Modding visual** — comunidade pode criar skins, texturas, e até engines de renderização alternativos sem tocar no servidor
