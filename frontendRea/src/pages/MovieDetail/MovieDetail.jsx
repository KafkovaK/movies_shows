import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './MovieDetail.css'

// displays details about the movie
// shows user interaction
function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [movieState, setMovieState] = useState({
        liked: false,
        watched: false,
        rating: 0,
        favorite: false
    });


    useEffect(() => {
        fetch(`http://localhost:5000/api/movies/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("user"));
        if (!stored) return;

        setUser(stored);

        const existing = stored.movies?.find(m => m.id === Number(id));

        if (existing) {
            setMovieState(existing);
        }
    }, [id]);

    // stores users action
    const updatesActionText = (updates, title) => {
        if (updates.liked !== undefined) return updates.liked ? `Liked ${title}` : `Unliked ${title}`;
        if (updates.watched !== undefined) return updates.watched ? `Watched ${title}` : `Removed ${title} from watched`;
        if (updates.favorite !== undefined) return updates.favorite ? `Added ${title} to favorites` : `Removed ${title} from favorites`;
        if (updates.rating !== undefined) return `Rated ${title} ${updates.rating}/5`;
        return `Updated ${title}`;
    };

    // updates user data in localstorage
    const updateUserMovie = (updates) => {
        if (!user) return;

        const updatedMovie = {
            ...movieState,
            ...updates,
            id: Number(id),
            title: movie.title
        };
        let updatedMovies = user.movies || [];
        const exists = updatedMovies.find(m => m.id === Number(id));

        if (exists) {
            updatedMovies = updatedMovies.map(m =>
                m.id === Number(id) ? updatedMovie : m
            );
        } else {
            updatedMovies.push(updatedMovie);
        }
        const updatedUser = {
            ...user,
            movies: updatedMovies,
            activity: [
                updatesActionText(updates, movie.title),
                ...(user.activity || [])
            ]
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setMovieState(updatedMovie);
    };

    if (!movie) return <div className="detail-loading">Loading...</div>;

    const trailer = movie.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
    const director = movie.credits?.crew?.find(p => p.job === "Director");
    const cast = movie.credits?.cast?.slice(0, 6);

    return (
        <div className="detail-page">
            <div
                className="detail-bg"
                style={{ '--detail-bg': `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            />
            <div className="detail-overlay" />
            <div className="detail-content">
                <button className="detail-back" onClick={() => navigate(-1)}>
                    ← BACK
                </button>
                <div className="detail-main">
                    <img
                        className="detail-poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <div className="detail-info">
                        <h1 className="detail-title">{movie.title.toUpperCase()}</h1>

                        <div className="detail-meta">
                            <span className="meta-tag">⭐ {movie.vote_average?.toFixed(1)}</span>
                            <span className="meta-tag">{movie.release_date?.split("-")[0]}</span>
                            <span className="meta-tag">{movie.runtime} min</span>
                            {movie.genres?.map(g => (
                                <span key={g.id} className="meta-tag">{g.name}</span>
                            ))}
                        </div>

                        <p className="detail-overview">{movie.overview}</p>
                        {/* DIRECTOR and CAST */}
                        {director && (
                            <>
                                <div className="detail-divider" />
                                <p className="detail-director">
                                    DIRECTOR: <span>{director.name}</span>
                                </p>
                            </>
                        )}
                        {cast && (
                            <>
                                <div className={"detail-divider"} />
                                <div className="detail-cast">
                                    <h3>CAST</h3>
                                    <div className="cast-list">
                                        {cast.map(person => (
                                            <div key={person.id} className="cast-card">
                                                <img
                                                    src={person.profile_path
                                                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=111111&color=ED5EED&size=80`}
                                                    alt={person.name}
                                                />
                                                <p className="cast-name">{person.name}</p>
                                                <p className="cast-char">{person.character}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {/* buttons for user action */}
                        <div className="detail-buttons">
                            {user && (
                                <div className="detail-user-actions">
                                    <button
                                        className={`action-btn ${movieState.liked ? "active" : ""}`}
                                        onClick={() => updateUserMovie({ liked: !movieState.liked })}
                                    >
                                        ♥ LIKE
                                    </button>

                                    <button
                                        className={`action-btn ${movieState.watched ? "active" : ""}`}
                                        onClick={() => updateUserMovie({ watched: !movieState.watched })}
                                    >
                                        ✔ WATCHED
                                    </button>

                                    <button
                                        className={`action-btn ${movieState.favorite ? "active" : ""}`}
                                        onClick={() => updateUserMovie({ favorite: !movieState.favorite })}
                                    >
                                        ★ FAVORITE
                                    </button>

                                    <div className="rating">
                                        {[1,2,3,4,5].map(num => (
                                            <span
                                                key={num}
                                                className={num <= movieState.rating ? "star active" : "star"}
                                                onClick={() => updateUserMovie({ rating: num })}
                                            >
                    ★
                </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <button className="btn-primary">▷ EXECUTE_STREAMING</button>
                            {trailer && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-secondary"
                                >
                                    ▷ WATCH TRAILER
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail