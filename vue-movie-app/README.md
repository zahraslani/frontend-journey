# Vue Movie Search App

A responsive movie search app built with Vue 3, TypeScript, and Pinia. Search movies through the OMDb API with autocomplete suggestions, view details, and save favorites.

**Live demo:** https://vue-movie-app-vert.vercel.app

## Features

- Search movies using the OMDb API
- Autocomplete suggestions while typing (debounced to reduce API requests)
- Movie details in a modal window
- Add and remove favorites (persisted in localStorage)
- Responsive grid layout
- Component-based architecture (props and emits)
- Typed data models (`Movie`, `MovieDetails`) and a type-checked build (`vue-tsc`)

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
├── api/          OMDb request helpers
├── components/   MovieCard, MovieModal, SearchBar
├── router/       route definitions
├── stores/       Pinia stores
├── types/        TypeScript interfaces
└── views/        HomeView, FavoritesView
```

## Getting Started

**Requirements:** Node.js 22.18+ (or 24.12+) and a free [OMDb API key](https://www.omdbapi.com/apikey.aspx)

```bash
git clone https://github.com/zahraslani/frontend-journey.git
cd frontend-journey/vue-movie-app
npm install
```

Create a file named `.env.local` in the `vue-movie-app` folder and add your key:

```
VITE_OMDB_API_KEY=your_key_here
```

Then start the dev server:

```bash
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
- Debouncing user input to avoid unnecessary requests
- Keeping API keys out of the repository with environment variables
- Structuring a Vue app with reusable components, props, and emits
- Persisting user data with localStorage
- Writing type-safe code with TypeScript interfaces

## Data Source

Movie data is provided by the [OMDb API](https://www.omdbapi.com/).