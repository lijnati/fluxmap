# Fluxmap

> Visualize activity. Understand patterns.

Fluxmap turns complex behavioral data, website interactions, git velocity, and on-chain transactions into beautiful, interactive heatmaps.

## Features

- **Interactive Heatmap Engine**: Customize color palettes, cell dimensions, scales, and rounding.
- **Multiple Data Sources**: Support for GitHub commits, web analytics, blockchain transactions, and productivity metrics.
- **AI Diagnostics**: Automated peak velocity detection, anomaly flags, and performance insights.
- **Universal Embed**: Copy-paste iframe snippets to embed heatmaps in Notion, GitHub READMEs, or web apps.
- **Export Options**: Export heatmaps as PNG, SVG, or raw JSON data.

## Tech Stack

- **Framework**: Next.js 16 & React 19
- **Styling & Icons**: Tailwind CSS & Lucide React
- **Animations**: Framer Motion
- **Database**: Prisma

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:6767](http://localhost:6767) in your browser.

## Scripts

- `npm run dev` – Starts the development server on port 6767
- `npm run build` – Builds the production bundle
- `npm run start` – Starts the production server on port 6767
- `npm run lint` – Runs ESLint
