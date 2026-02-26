# 🟢 [Flux](https://anuragkumar-git.github.io/flux/) — Offline First Time Tracking PWA

A modern, offline-first productivity timer built with React + Vite.
Designed for focused study and deep work sessions with clean architecture and scalable foundations.

## ✨ Features (v1.0.0)

- ⏱ Session-based time tracking

- ⏸ Pause & auto-terminate after 10 min inactivity

<!-- - ⏳ Configurable session limit (default 3 hours) -->

- 📅 Day-wise grouped history

- ✏️ Inline session title editing

- 📊 Daily total time calculation

- 📱 Mobile-first responsive UI

- 🌿 Modern emerald productivity theme

- ⚡ Offline support (PWA)

- 💾 IndexedDB persistence using Dexie

## 🏗 Architecture Overview

Flux follows a layered architecture:
```
UI (React Components)
        ↓
Hook Layer (useSession)
        ↓
Service Layer
        ↓
Session Engine (Domain Logic)
        ↓
Repository Layer (IndexedDB via Dexie)
```
#### Why this matters:

- UI is fully separated from domain logic

- Persistence layer can be swapped with backend later

- Engine is pure and testable

- Scalable for multi-device sync in future versions

## 🧠 Session Rules

- A session can be:

    - Running

    - Paused

    - Ended

- If pause exceeds 10 minutes → session auto-ends

- If session crosses midnight → new day session starts automatically

- Paused time is NOT counted in total duration

- Session descriptions are editable

- System controls duration logic

## 🛠 Tech Stack

- `React (Vite + SWC)`

- `TailwindCSS v4`

- `Dexie.js` (IndexedDB wrapper)

- `vite-plugin-pwa`

- `Modern ES Modules`

## 📦 Installation
```Bash
git clone https://github.com/anuragkumar-git/flux
cd flux
npm install
npm run dev
```

## 🚀 Build
```Bash
npm run build
npm run preview
```

## 🌐 Deployment

Deployed via GitHub Pages.
[Link](https://anuragkumar-git.github.io/flux/)


## 🔮 Roadmap (Future Versions)

- Weekly analytics

- Streak tracking

- Multi-tab synchronization

- Backend sync

- User authentication

- Dark mode

- Export sessions (CSV)

## 🧑‍💻 Author

### Anurag Patel
Computer Engineering graduate focused on scalable architecture.