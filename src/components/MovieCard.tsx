import type { Movie } from "@/lib/omdb";

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <button
      onClick={() => onClick(movie.imdbID)}
      className="flex-shrink-0 w-[140px] md:w-[180px] group relative rounded overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 hover:shadow-[0_8px_30px_rgba(229,9,20,0.3)] focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full aspect-[2/3] object-cover rounded"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
        <div>
          <p className="text-xs font-semibold text-foreground line-clamp-2">{movie.Title}</p>
          <p className="text-[10px] text-muted-foreground">{movie.Year}</p>
        </div>
      </div>
    </button>
  );
};

export default MovieCard;
