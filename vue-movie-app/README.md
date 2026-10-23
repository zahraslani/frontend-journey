# Vue Movie Search App

A responsive movie search app built with Vue 3, TypeScript, and Pinia. Search movies through the OMDb API, view details, and save favorites.

**Live demo:** https://vue-movie-app-vert.vercel.app

## Features

- Search movies using the OMDb API
- Movie details in a modal window
- Add and remove favorites (persisted in localStorage)
- Responsive grid layout
- Component-based architecture (props and emits)
- Type-checked build (`vue-tsc`)

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia for state management
- Vue Router
- Vite
- ESLint, Oxlint, and Prettier for code quality

## Project Structure

```
src/
├── components/   MovieCard, MovieModal, SearchBar
├── router/       route definitions
├── stores/       Pinia stores
└── views/        HomeView, FavoritesView
```

## Getting Started

**Requirements:** Node.js 22.18+ (or 24.12+)

```bash
git clone https://github.com/zahraslani/frontend-journey.git
cd frontend-journey/vue-movie-app
npm install
npm run dev
```

Other useful commands:

```bash
npm run build    # type-check and build for production
npm run lint     # lint and auto-fix
npm run format   # format with Prettier
```

## What I Learned

- Managing global state with Pinia
- Working with an external REST API (async/await, error handling)
- Structuring a Vue app with reusable components, props, and emits
- Persisting user data with localStorage
- Writing type-safe code with TypeScript

## Data Source

Movie data is provided by the [OMDb API](https://www.omdbapi.com/).