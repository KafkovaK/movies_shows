
import express from 'express';
import { getPopularMovies, getTopRated, getTrending, getNowPlaying, getMovieById, searchMovies, getGenres, getMoviesByGenre } from "./moviesController.js";
const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/top-rated", getTopRated);
router.get("/trending", getTrending);
router.get("/now-playing", getNowPlaying);
router.get("/genres", getGenres);
router.get("/genre/:genreId", getMoviesByGenre);
router.get("/search/:query", searchMovies);
router.get("/:id", getMovieById);


export default router;