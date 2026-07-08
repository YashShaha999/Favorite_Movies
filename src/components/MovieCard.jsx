import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";
import { useToast } from "../context/ToastContext";

export function MovieCard({ movie, onSelect }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const { addToast } = useToast();

  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.stopPropagation(); // Prevent opening the details modal
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
      addToast(`Removed "${movie.title}" from favorites`, "remove");
    } else {
      addToFavorites(movie);
      addToast(`Added "${movie.title}" to favorites!`, "success");
    }
  }

  return (
    <div className="movie-card" onClick={() => onSelect && onSelect(movie)}>
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            ❤
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </span>
          <span className="movie-rating">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
