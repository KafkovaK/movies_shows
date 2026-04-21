import { useState, useEffect } from 'react';
import MovieRow from '../MovieRow/MovieRow.jsx';

function MovieBody() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [trending, setTrending] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);

    useEffect(() => {
        // fetches popular movies
        fetch("http://localhost:5000/api/movies/popular")
            .then(res => res.json())
            .then(data => setPopular(data));

        // fetches top-rated movies
        fetch("http://localhost:5000/api/movies/top-rated")
            .then(res => res.json())
            .then(data => setTopRated(data));

        // fetches trending movies
        fetch("http://localhost:5000/api/movies/trending")
            .then(res => res.json())
            .then(data => setTrending(data));

        // fetches movies that are playing in the cinema
        fetch("http://localhost:5000/api/movies/now-playing")
            .then(res => res.json())
            .then(data => setNowPlaying(data));
    }, []);

    return (
        <div className="movie-body">
            <MovieRow title="POPULAR" movies={popular} />
            <MovieRow title="TOP_RATED" movies={topRated} />
            <MovieRow title="TRENDING" movies={trending} />
            <MovieRow title="NOW_PLAYING" movies={nowPlaying} />
        </div>
    );
}

export default MovieBody;