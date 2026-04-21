import { useNavigate } from 'react-router-dom'
import "./MovieCard.css"

// movie cards
// navigates to more details on the movie
function MovieCard({ movie }) {
    const navigate = useNavigate();
    return (
        <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
            <div className="movie-card-inner">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="movie-card-overlay">
                    <div className="overlay-rating">
                        ⭐ {movie.vote_average?.toFixed(1)}
                    </div>
                    <p className="overlay-title">{movie.title}</p>
                    <button className="overlay-btn">▷ VIEW</button>
                </div>
            </div>
            <p className="movie-card-title">{movie.title}</p>
        </div>
    )
}

export default MovieCard