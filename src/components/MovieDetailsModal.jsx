import { useEffect, useState } from "react";
import "../css/MovieDetailsModal.css";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../context/MovieContext";
import { useToast } from "../context/ToastContext";

function MovieDetailsModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const { addToast } = useToast();

  const favorite = isFavorite(movie.id);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fullDetails = await getMovieDetails(movie.id);
        setDetails(fullDetails);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movie.id]);

  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
      addToast(`Removed "${movie.title}" from favorites`, "remove");
    } else {
      addToFavorites(movie);
      addToast(`Added "${movie.title}" to favorites!`, "success");
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {loading ? (
          <div className="modal-loading">
            <div className="modal-spinner"></div>
            <p>Loading details...</p>
          </div>
        ) : (
          <>
            <div
              className="modal-hero"
              style={{
                backgroundImage: details?.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`
                  : "none",
              }}
            >
              <div className="modal-hero-overlay"></div>
            </div>

            <div className="modal-body">
              <div className="modal-poster-section">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                  }
                  alt={movie.title}
                  className="modal-poster"
                />
              </div>

              <div className="modal-info-section">
                <h2 className="modal-title">{movie.title}</h2>
                {details?.tagline && <p className="modal-tagline">"{details.tagline}"</p>}

                <div className="modal-meta">
                  <span className="modal-rating">
                    ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </span>
                  <span className="modal-divider">•</span>
                  <span className="modal-release">
                    {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                  </span>
                  <span className="modal-divider">•</span>
                  <span className="modal-runtime">
                    {formatRuntime(details?.runtime)}
                  </span>
                </div>

                <div className="modal-genres">
                  {details?.genres?.map((genre) => (
                    <span key={genre.id} className="genre-badge">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="modal-overview">
                  <h3>Overview</h3>
                  <p>{movie.overview || "No overview available."}</p>
                </div>

                <button
                  className={`modal-favorite-btn ${favorite ? "active" : ""}`}
                  onClick={handleFavoriteToggle}
                >
                  {favorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsModal;
