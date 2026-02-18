import { useRef } from "react";
import { useSearchMovies } from "@/hooks/useMovies";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieRowProps {
  title: string;
  query: string;
  onMovieClick: (id: string) => void;
}

const MovieRow = ({ title, query, onMovieClick }: MovieRowProps) => {
  const { data: movies, isLoading } = useSearchMovies(query);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="px-6 md:px-12 mb-8">
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">{title}</h2>
      <div className="relative group/row">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-background/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="flex-shrink-0 w-[140px] md:w-[180px] aspect-[2/3] rounded bg-muted" />
              ))
            : movies?.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} onClick={onMovieClick} />
              ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-background/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </section>
  );
};

export default MovieRow;
