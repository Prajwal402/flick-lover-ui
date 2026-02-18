import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import MovieDetailModal from "@/components/MovieDetailModal";
import { CATEGORY_QUERIES } from "@/lib/omdb";

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroBanner onMoreInfo={setSelectedMovie} />
        <div className="-mt-16 relative z-10 pt-4 space-y-2">
          {CATEGORY_QUERIES.map((cat) => (
            <MovieRow
              key={cat.query}
              title={cat.title}
              query={cat.query}
              onMovieClick={setSelectedMovie}
            />
          ))}
        </div>
      </main>
      <MovieDetailModal imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
};

export default Index;
