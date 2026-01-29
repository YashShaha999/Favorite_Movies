// APi ref "https://developer.themoviedb.org/reference/movie-popular-list"

//https://developer.themoviedb.org/docs/finding-data

const API_Key = "4fd5ea4ed349a01a1552f686fa5a5859";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_Key}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie/?api_key=${API_Key}=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};
