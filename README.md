# 🎂 Happy Birthday Moon ❤️

A fully interactive, multi-page birthday surprise website built with pure HTML, CSS, and JavaScript.

---

## 📁 Folder Structure

```
project/
│
├── index.html          ← Open this in any browser
├── css/
│   └── style.css
├── js/
│   └── script.js
├── music/
│   └── birthday.mp3    ← Add your birthday song here
├── images/
│   ├── photo1.jpg      ← Replace with real photos
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   ├── photo5.jpg
│   └── photo6.jpg
└── README.md
```

---

## 🚀 How to Use

1. **Open `index.html`** in any modern web browser (Chrome, Edge, Firefox).
2. No server required — works completely offline!

---

## 🎵 Adding Birthday Music

Place an MP3 file named `birthday.mp3` inside the `music/` folder.

> Tip: Search for "Happy Birthday instrumental MP3" or use any royalty-free birthday song.

---

## 📸 Adding Photos

Replace the placeholder files in the `images/` folder:

| File | Description |
|------|-------------|
| `photo1.jpg` | Memory 1 |
| `photo2.jpg` | Memory 2 |
| `photo3.jpg` | Memory 3 |
| `photo4.jpg` | Memory 4 |
| `photo5.jpg` | Memory 5 |
| `photo6.jpg` | Memory 6 |

Photos are displayed in:
- A **masonry grid gallery** with hover zoom and lightbox preview
- A **circular rotating row** with glowing border animation

---

## 🎮 Pages & Features

| Page | Feature |
|------|---------|
| 1 – Welcome | Stars, floating hearts, balloons, animated title |
| 2 – Calendar | June 1–15 flip calendar with page-turn animation |
| 3 – Birthday Reveal | Full-screen popup with fireworks & confetti |
| 4 – Birthday Cake | 3D CSS cake with flickering candles + music player |
| 5 – Cake Cutting | Knife animation, cake splits, balloons, fireworks |
| 6 – Memory Gallery | Masonry grid + circular photos + lightbox |
| 7 – Love Message | Typewriter love letter with falling flowers |

---

## ⌨️ Keyboard Shortcuts

- `→` Arrow Right — Next calendar day
- `←` Arrow Left  — Previous calendar day
- `Esc`           — Close lightbox

## 📱 Touch / Swipe

Swipe **left** on the calendar to go to the next day.  
Swipe **right** to go back.

---

## 🛠 Libraries Used

- [GSAP 3](https://gsap.com/) — Animations
- [Animate.css](https://animate.style/) — CSS animation classes
- [canvas-confetti](https://github.com/catdad/canvas-confetti) — Confetti & fireworks

All libraries are loaded via CDN — no `npm install` needed.

---

## ❤️ Customization

Edit `js/script.js` to change:
- `dayMessages[]` array — romantic messages for each day
- `fullMessage` string — the final love letter text

Edit `css/style.css` to change:
- `--pink`, `--gold`, `--purple` CSS variables — color theme

---

Made with ❤️ for MOON
