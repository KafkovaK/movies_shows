import {useState, useEffect} from 'react'
import "./Header.css"

function Header() {
    const [movies, setMovies] = useState([]);
    const [current, setCurrent] = useState(0);

    // fetches first 5 movies
    useEffect(() => {
        fetch("http://localhost:5000/api/movies/popular")
        .then(res => res.json())
        .then(data => setMovies(data.slice(0, 5)))
        .catch(err => console.log(err));
    }, []);

    // auto-rotates the movies every 5 seconds
    useEffect(() => {
        if (movies.length === 0) return;
        const interval = setInterval(() => {
            setCurrent(prev => {
                console.log("changing from", prev, "to", (prev + 1) % movies.length);
                return (prev + 1) % movies.length;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [movies.length]);

    if (movies.length === 0) return <div className={"hero-loading"}>Loading...</div>;
    const movie = movies[current];

    return (
        <div className={"header"}>
            <div className={"hero"} style={{ '--hero-bg': `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className={"hero-overlay"}></div>
                <div className={"hero-content"}>
                    <h1 className={"hero-title"}>{movie.title.toUpperCase()}</h1>
                    <p className={"hero-desc"}>{movie.overview}</p>
                    <div className={"hero-buttons"}>
                        <button className={"btn-primary"}>▷ EXECUTE_STREAMING</button>
                        <button className={"btn-secondary"}>ACCESS_DATABASE</button>
                    </div>
                    <div className="hero-dots">
                        {movies.map((_, i) => (
                            <span
                                key={i}
                                className={`dot ${i === current ? 'dot-active' : ''}`}
                                onClick={() => setCurrent(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;