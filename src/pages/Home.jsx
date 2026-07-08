import { useState, useEffect } from "react";
import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import MovieSkeleton from "../components/MovieSkeleton";
import MovieDetailsModal from "../components/MovieDetailsModal";
import {
  getPopularMovies,
  searchMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getTrendingMovies,
} from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("trending");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load movies based on category or search
  useEffect(() => {
    if (searchQuery.trim()) return; // Search is active, do not load category

    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let moviesData = [];
        switch (category) {
          case "trending":
            moviesData = await getTrendingMovies();
            break;
          case "popular":
            moviesData = await getPopularMovies();
            break;
          case "top_rated":
            moviesData = await getTopRatedMovies();
            break;
          case "upcoming":
            moviesData = await getUpcomingMovies();
            break;
          default:
            moviesData = await getPopularMovies();
        }
        setMovies(moviesData);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [category, searchQuery]);

  // Handle search submit
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setCategory(""); // Clear active tab highlight since we are in search mode
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  // If search query is cleared, reset to the popular category
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim()) {
      setCategory("trending");
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next Story</h1>
          <p>Explore millions of movies, top-rated features, and trending highlights.</p>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setCategory("trending");
                  }}
                >
                  &times;
                </button>
              )}
            </div>
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="category-container">
        <div className="category-tabs">
          <button
            className={`tab-btn ${category === "trending" ? "active" : ""}`}
            onClick={() => {
              setCategory("trending");
              setSearchQuery("");
            }}
          >
            🔥 Trending
          </button>
          <button
            className={`tab-btn ${category === "popular" ? "active" : ""}`}
            onClick={() => {
              setCategory("popular");
              setSearchQuery("");
            }}
          >
            ⭐ Popular
          </button>
          <button
            className={`tab-btn ${category === "top_rated" ? "active" : ""}`}
            onClick={() => {
              setCategory("top_rated");
              setSearchQuery("");
            }}
          >
            🏆 Top Rated
          </button>
          <button
            className={`tab-btn ${category === "upcoming" ? "active" : ""}`}
            onClick={() => {
              setCategory("upcoming");
              setSearchQuery("");
            }}
          >
            📅 Upcoming
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="movies-grid">
          {Array.from({ length: 8 }).map((_, idx) => (
            <MovieSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="no-results">
              <h2>No movies found</h2>
              <p>We couldn't find any movies matching "{searchQuery}". Try another search!</p>
            </div>
          ) : (
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} onSelect={setSelectedMovie} />
              ))}
            </div>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default Home;
