export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface MovieDetails extends Movie {
  Plot: string
  Director: string
  Actors: string
  imdbRating: string
}