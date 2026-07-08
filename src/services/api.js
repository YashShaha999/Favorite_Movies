// API ref: https://developer.themoviedb.org/reference/movie-popular-list
// Docs: https://developer.themoviedb.org/docs/finding-data

const API_Key = "4fd5ea4ed349a01a1552f686fa5a5859";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_Key}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_Key}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};

export const getTopRatedMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_Key}`);
  const data = await response.json();
  return data.results;
};

export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_Key}`);
  const data = await response.json();
  return data.results;
};

export const getTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_Key}`);
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_Key}`);
  const data = await response.json();
  return data;
};
