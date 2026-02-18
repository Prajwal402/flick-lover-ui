import { useMovieDetail } from "@/hooks/useMovies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

interface MovieDetailModalProps {
  imdbID: string | null;
  onClose: () => void;
}

const MovieDetailModal = ({ imdbID, onClose }: MovieDetailModalProps) => {
  const { data: movie, isLoading } = useMovieDetail(imdbID);

  return (
    <Dialog open={!!imdbID} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {isLoading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-3/4 bg-muted" />
            <Skeleton className="h-64 w-full bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
          </div>
        ) : movie ? (
          <>
            {/* Poster header */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>

            <div className="p-6 -mt-16 relative z-10 space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-extrabold text-foreground">
                  {movie.Title}
                </DialogTitle>
                <DialogDescription className="sr-only">Details about {movie.Title}</DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 text-primary font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  {movie.imdbRating}
                </span>
                <span>{movie.Year}</span>
                <span>{movie.Runtime}</span>
                <span>{movie.Rated}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.Genre.split(", ").map((g) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed">{movie.Plot}</p>

              <div className="space-y-1 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Director:</span> {movie.Director}</p>
                <p><span className="text-foreground font-medium">Cast:</span> {movie.Actors}</p>
                {movie.Awards !== "N/A" && (
                  <p><span className="text-foreground font-medium">Awards:</span> {movie.Awards}</p>
                )}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailModal;
