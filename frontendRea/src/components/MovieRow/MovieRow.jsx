import { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import "./MovieRow.css";

function MovieRow({ title, movies }) {
    const rowRef = useRef(null);
    const scroll = (direction) => {
        const { current } = rowRef;
        const scrollAmount = 500;

        // horizontal scroll
        if (direction === 'left') {
            current.scrollTo({
                left: current.scrollLeft - scrollAmount,
                behavior: 'smooth'
            });
        } else {
            current.scrollTo({
                left: current.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="movie-row">
            <h2 className="row-title">{title}</h2>
            <div className="row-container">
                // left arrow for scrolling
                <button className="handle handle-left" onClick={() => scroll('left')}>
                    ‹
                </button>
                <div className="row-cards" ref={rowRef}>
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                // right arrow for scrolling
                <button className="handle handle-right" onClick={() => scroll('right')}>
                    ›
                </button>
            </div>
        </div>
    );
}

export default MovieRow;