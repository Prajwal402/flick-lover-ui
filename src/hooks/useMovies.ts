import { useQuery } from "@tanstack/react-query";
import { searchMovies, getMovieDetail } from "@/lib/omdb";

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => searchMovies(query),
    staleTime: 1000 * 60 * 10,
  });
}

export function useMovieDetail(imdbID: string | null) {
  return useQuery({
    queryKey: ["movie-detail", imdbID],
    queryFn: () => getMovieDetail(imdbID!),
    enabled: !!imdbID,
    staleTime: 1000 * 60 * 10,
  });
}
