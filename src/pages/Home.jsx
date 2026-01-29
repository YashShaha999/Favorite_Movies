import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failded to search movies...");
      } finally {
        setLoding(false);
      }
    };

    loadPopularMovies();
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loding) return;

    setLoding(true);

    try {
      const searchMovies = await searchMovies(searchQuery);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Faild to search Movies");
    } finally {
      setLoding("false");
    }
    setSearchQuery("");
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loding ? (
        <div className="loding">Loding....</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            // movie.title.toLowerCase().startsWith(searchQuery) &&
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
