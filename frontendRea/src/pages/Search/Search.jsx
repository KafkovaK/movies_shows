import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../../components/MovieCard/MovieCard.jsx'
import './Search.css'

// displays movies based on search query from URL
function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    // when query changes, it fetches another results
    useEffect(() => {
        if (!query) return;
        setLoading(true);
        fetch(`http://localhost:5000/api/movies/search/${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [query]);

    return (
        <div className="search-page">
            <h2 className="search-title">
                SEARCH_RESULTS: <span>{query}</span>
            </h2>
            {loading && <p className="search-loading">Searching...</p>}
            <div className="search-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            {!loading && movies.length === 0 && (
                <p className="search-empty">No results found for "{query}"</p>
            )}
        </div>
    )
}

export default Search;