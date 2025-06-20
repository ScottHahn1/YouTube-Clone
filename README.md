# YouTube Clone

## Overview

This project is a YouTube clone built with Next.js and Tailwind CSS. It replicates the essential features of YouTube, allowing users to search for videos, explore trending videos, read user comments, view channel details, and watch videos with a smooth and responsive interface.

Leveraging Next.js for server-side rendering and routing, combined with Tailwind CSS for utility-first styling, this app showcases modern web development practices and a sleek user experience.

## Features

- **Home Page**: Displays popular/trending videos with infinite scrolling for seamless browsing.
- **Search**: Search for both videos and channels with real-time results.
- **Video Playback**: Watch videos using a clean, user-friendly player.
- **Comments**: Read user comments below videos to see community discussions.
- **Channel Pages**: View detailed channel information including channel home section, channel videos, stats, and playlists.
- **Responsive Design**: Fully responsive UI that works smoothly on desktop and mobile devices.
- **Server-Side Rendering**: Powered by Next.js for fast initial loads and SEO benefits.
- **Modern Styling**: Styled with Tailwind CSS for a clean, customizable design.

## Technologies Used
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Other**: RESTful APIs, React Query (TanStack Query)
- **API**: YouTube Data API

## Run Locally

Clone the project

```bash
  git clone https://github.com/ScottHahn1/YouTube-Clone.git
```

Navigate to the project directory

```bash
  cd YouTube-Clone
```

Install dependencies

```bash
  npm install
```

## Configure environment variables

  Create a '.env.local' file in the root of the project and add:
  
  ```env
    API_KEY=your_youtube_api_key
    API_URL=http://localhost:3000
  ```

Run the development server

```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
```
