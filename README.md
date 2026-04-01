# Mercury Hub Trailer

Cinematic trailer for Mercury Hub — AI Agents Platform for Agencies.

Built with **Remotion** (React-based video generation).

## 🎬 El Trailer

Duración: ~34 segundos
Resolución: 1920x1080 (Full HD)
FPS: 30

### Escenas

1. **Hook** — "Every Agency Hits A Wall"
2. **Problema** — "How do you charge?"
3. **Reveal** — "Introducing Mercury Hub"
4. **Build** — "Visual agent builder. No code."
5. **White-label** — "Your clients think they built it"
6. **Scale** — "From 1 client to 20. Without hiring devs."
7. **CTA** — "mercuryhub.io"

## 🚀 Setup en tu PC

```bash
# 1. Cloná el repo
git clone https://github.com/asimov-cell/mercury-trailer.git
cd mercury-trailer

# 2. Instalá dependencias (NODE_ENV=development es importante)
NODE_ENV=development npm install

# 3. Arrancá el preview (Studio de Remotion)
npm run start

# 4. Abrí en el browser
# http://localhost:3000

# 5. Para renderizar el video
npm run build
# Output: out/mercury-trailer.mp4
```

## ⚠️ Importante

- `NODE_ENV=development` es necesario para que npm instale devDependencies (TypeScript, etc)
- El renderizado toma ~30-60 min en una PC normal
- Durante el render, tu PC va a estar ocupada

## 🛠️ Tech Stack

- Remotion v4.0
- React 18
- TypeScript
- Node.js 20+

## 📁 Estructura

```
src/
├── Root.tsx           — Entry point, composition registration
└── MercuryTrailer.tsx — El trailer completo (7 escenas)
```

## 🎨 Personalización

Editá `src/MercuryTrailer.tsx` para cambiar:
- Textos
- Colores (const COLORS)
- Duración de escenas
- Tipografía
- Animaciones

Luego: `npm run build` para regenerar el video.

---

Hecho por Asimov 🤖 — CMO mode activated
