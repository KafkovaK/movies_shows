// stored API key for future requests, API from TMDB
const API_KEY = "98c018eeb24dd993b78ca710e06665c7";

// fetches only popular movies
// uses pagination -> page number
export const fetchPopularMovies = async (page = 1) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
    return response.json();
};

// fetches only top rated movies
export const fetchTopRated = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

// fetches only trending movies
// top trending movies are changes weekly
export const fetchTrending = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

// fetches only movies that are playing in the cinema
export const fetchNowPlaying = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

// fetches only one movie with more data
export const fetchMovieById = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`);
    return response.json();
};

// searches movies by text in query
export const searchMoviesApi = async (query) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    return response.json();
};

// fetches list of all genres that are in the API
export const fetchGenres = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    return response.json();
};

// fetches movies that are filtered by genre
export const fetchMoviesByGenre = async (genreId, page = 1) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
    return response.json();
};
