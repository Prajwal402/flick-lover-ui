import { useMovieDetail } from "@/hooks/useMovies";
import { HERO_MOVIE_ID } from "@/lib/omdb";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroBannerProps {
  onMoreInfo: (id: string) => void;
}

const HeroBanner = ({ onMoreInfo }: HeroBannerProps) => {
  const { data: movie, isLoading } = useMovieDetail(HERO_MOVIE_ID);

  if (isLoading) {
    return (
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-secondary">
        <div className="absolute bottom-20 left-6 md:left-12 space-y-4 z-10">
          <Skeleton className="h-12 w-72 bg-muted" />
          <Skeleton className="h-4 w-96 bg-muted" />
          <Skeleton className="h-4 w-80 bg-muted" />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background poster */}
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-16 md:bottom-24 left-6 md:left-12 max-w-2xl z-10 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground drop-shadow-lg leading-tight">
          {movie.Title}
        </h1>
        <p className="text-sm md:text-base text-foreground/80 line-clamp-3 leading-relaxed">
          {movie.Plot}
        </p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="text-primary font-bold">{movie.imdbRating} ★</span>
          <span>{movie.Year}</span>
          <span>{movie.Runtime}</span>
          <span>{movie.Rated}</span>
        </div>
        <div className="flex gap-3 pt-2">
          <Button className="bg-foreground text-background hover:bg-foreground/80 font-semibold gap-2 px-6">
            <Play className="w-4 h-4 fill-current" /> Play
          </Button>
          <Button
            variant="outline"
            className="border-foreground/30 text-foreground hover:bg-foreground/10 font-semibold gap-2 px-6"
            onClick={() => onMoreInfo(movie.imdbID)}
          >
            <Info className="w-4 h-4" /> More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
