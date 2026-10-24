const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

async function request(params: Record<string, string>) {
  const url = new URL(BASE_URL)
  url.search = new URLSearchParams({ apikey: API_KEY, ...params }).toString()

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`OMDb request failed with status ${res.status}`)
  }
  return res.json()
}

export function searchMovies(term: string) {
  return request({ s: term })
}

export function getMovieById(id: string) {
  return request({ i: id })
}