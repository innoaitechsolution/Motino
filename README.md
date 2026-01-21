# Motino - Daily Motivation App

A beautiful, responsive web app where users can spin a colorful wheel once per day to receive a motivational quote.

## Features

- 🎡 Rainbow-colored 8-part spinning wheel
- 💬 30+ motivational quotes
- 📱 Mobile-first responsive design
- 🔄 Daily spin limit (one spin per day)
- 📤 Share quotes via Web Share API
- 💾 LocalStorage persistence

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Deployment

This app can be deployed to:
- **Vercel**: Connect your repository and deploy
- **Netlify**: Drag and drop the `dist` folder or connect via Git

## Tech Stack

- React 18
- Vite
- CSS3 (no frameworks)
- Google Fonts (Poppins)

## Browser Support

- Modern browsers with ES6+ support
- Web Share API for sharing (with clipboard fallback)
