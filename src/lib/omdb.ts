const API_KEY = "6294ec1c";
const BASE_URL = "https://www.omdbapi.com";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
  imdbRating: string;
  imdbVotes: string;
  BoxOffice?: string;
}

export interface SearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
  const data: SearchResult = await res.json();
  if (data.Response === "True") {
    return data.Search.filter((m) => m.Poster !== "N/A");
  }
  return [];
}

export async function getMovieDetail(imdbID: string): Promise<MovieDetail | null> {
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
  const data = await res.json();
  if (data.Response === "True") return data as MovieDetail;
  return null;
}

export const CATEGORY_QUERIES: { title: string; query: string }[] = [
  { title: "Trending Now", query: "marvel" },
  { title: "Popular", query: "batman" },
  { title: "Top Rated", query: "godfather" },
  { title: "Action", query: "fast furious" },
  { title: "Drama", query: "shawshank" },
];

export const HERO_MOVIE_ID = "tt0468569"; // The Dark Knight
