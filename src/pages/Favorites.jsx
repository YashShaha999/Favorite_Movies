import { useState } from "react";
import "../css/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import MovieDetailsModal from "../components/MovieDetailsModal";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (favorites.length > 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-header">
          <h2 className="favorites-title">Your Favorites Collection</h2>
          <p className="favorites-subtitle">
            You have {favorites.length} movie{favorites.length === 1 ? "" : "s"} saved.
          </p>
        </div>

        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} onSelect={setSelectedMovie} />
          ))}
        </div>

        {selectedMovie && (
          <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>
    );
  }

  return (
    <div className="favorites-empty-container">
      <div className="favorites-empty">
        <div className="empty-icon-wrapper">
          <svg
            className="empty-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <line x1="7" y1="2" x2="7" y2="22"></line>
            <line x1="17" y1="2" x2="17" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="2" y1="7" x2="7" y2="7"></line>
            <line x1="2" y1="17" x2="7" y2="17"></line>
            <line x1="17" y1="17" x2="22" y2="17"></line>
            <line x1="17" y1="7" x2="22" y2="7"></line>
          </svg>
        </div>
        <h2>Your collection is empty</h2>
        <p>Explore our selection on the home page and start marking your favorites!</p>
        <Link to="/" className="browse-btn">
          Browse Movies
        </Link>
      </div>
    </div>
  );
}

export default Favorites;
