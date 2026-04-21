import { useState, useEffect } from 'react'
import MovieCard from '../../components/MovieCard/MovieCard.jsx'
import './Browse.css'

// page for browsing movies
function Browse() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [showGenres, setShowGenres] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollBtn(true);
            } else {
                setShowScrollBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // fetches genres
    useEffect(() => {
        fetch("http://localhost:5000/api/movies/genres")
            .then(res => res.json())
            .then(data => setGenres(data))
            .catch(err => console.log(err));
    }, []);

    // only shows movies based on the genre
    // and refreshes movies when user selects another genre
    useEffect(() => {
        setLoading(true);
        setPage(1);
        const url = selectedGenre
            ? `http://localhost:5000/api/movies/genre/${selectedGenre}?page=1`
            : `http://localhost:5000/api/movies/popular?page=1`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [selectedGenre]);

    // loading more movies, pagination
    // if selected genre then it shows only movies in the genre
    const loadMore = () => {
        setLoadingMore(true);
        const nextPage = page + 1;
        const url = selectedGenre
            ? `http://localhost:5000/api/movies/genre/${selectedGenre}?page=${nextPage}`
            : `http://localhost:5000/api/movies/popular?page=${nextPage}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMovies(prev => [...prev, ...data]);
                setPage(nextPage);
                setLoadingMore(false);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="browse-page">
            <h2 className="browse-title">./BROWSE_MOVIES</h2>
            <button
                className={`scroll-to-top ${showScrollBtn ? 'visible' : ''}`}
                onClick={scrollToTop}
            >
                <span className="arrow">▲</span>
                <span className="label">TOP_OF_STACK</span>
            </button>
            <div className="genre-filters">
                <button
                    className={`genre-btn ${selectedGenre === null ? 'genre-btn-active' : ''}`}
                    onClick={() => setSelectedGenre(null)}
                >
                    ALL
                </button>
                {genres.map(genre => (
                    <button
                        key={genre.id}
                        className={`genre-btn ${selectedGenre === genre.id ? 'genre-btn-active' : ''}`}
                        onClick={() => setSelectedGenre(genre.id)}
                    >
                        {genre.name.toUpperCase()}
                    </button>
                ))}
            </div>

            {loading && <p className="browse-loading">Loading...</p>}

            <div className="browse-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>

            <div className="browse-load-more">
                <button
                    className="btn-load-more"
                    onClick={loadMore}
                    disabled={loadingMore}
                >
                    {loadingMore ? "LOADING..." : "LOAD_MORE //"}
                </button>
            </div>
        </div>
    )
}

export default Browse