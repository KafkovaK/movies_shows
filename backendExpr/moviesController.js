// this is needed for requests from API and returns data to frontend

import { fetchPopularMovies, fetchTopRated, fetchTrending, fetchNowPlaying, fetchMovieById, searchMoviesApi, fetchGenres, fetchMoviesByGenre } from "./apiService.js";

export const getPopularMovies = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const movies = await fetchPopularMovies(page); // fetch from API by page
        res.json(movies.results); // sends only array of results
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};

export const getTopRated = async (req, res) => {
    try {
        const movies = await fetchTopRated(); //fetch from API
        res.json(movies.results); // sends only array of results
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};

export const getTrending = async (req, res) => {
    try {
        const movies = await fetchTrending(); //fetch from API
        res.json(movies.results); // sends only array of results
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};

export const getNowPlaying = async (req, res) => {
    try {
        const movies = await fetchNowPlaying(); //fetch from API
        res.json(movies.results); // sends only array of results
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await fetchMovieById(id); //fetch from API by movie id
        res.json(movie); // sends only array of results
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch movie" });
    }
};

export const searchMovies = async (req, res) => {
    try {
        const { query } = req.params;
        const movies = await searchMoviesApi(query); // searches API by query
        res.json(movies.results); // sends only array of results
    } catch (err) {
        res.status(500).json({ error: "Failed to search movies" });
    }
};

export const getGenres = async (req, res) => {
    try {
        const genres = await fetchGenres(); //fetch from API, all genres
        res.json(genres.genres); // sends only array of results
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch genres" });
    }
};

export const getMoviesByGenre = async (req, res) => {
    try {
        const { genreId } = req.params;
        const page = req.query.page || 1;
        const movies = await fetchMoviesByGenre(genreId, page); //fetch from API using genre id and page
        res.json(movies.results); // sends only array of results
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch movies by genre" });
    }
};