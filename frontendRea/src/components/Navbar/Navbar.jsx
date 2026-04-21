import {useState, useEffect, useRef} from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import "./Navbar.css"
import { FiHome, FiFilm, FiUser, FiSearch } from "react-icons/fi"

// main navigation bar
function Navbar() {
    const [query, setQuery] = useState("");
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, [location]);

    // when user clicks outside the dropdown menu it closes
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, [location]);


    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };


    useEffect(() => {
        if (location.pathname !== '/search') {
            setQuery("");
        }
    }, [location.pathname]);

    // search input
    // navigates back to browse page after deleting search input
    // searches by letters and then filters the movies in time
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim().length > 1) {
            navigate(`/search?query=${encodeURIComponent(value)}`, {
                state: { previousPath: location.pathname }
            });
        } else if (value.trim().length === 0) {
            navigate('/browse', { replace: true });
        }
    }


    return(
        <nav className={"navbar"}>
            <div className={"navbar-left"}>
                <div className={"navbar-logo"}>
                    <span className={"logo-icon"}>⚙</span>
                    <Link to="/" className={"logo-text"}>404://stream</Link>
                </div>
            </div>
            <div className={"navbar-links"}>
                <Link to="/">
                    <FiHome className="nav-icon"/>
                    <span className="nav-text"> >_root@home:~#</span>
                </Link>

                <Link to="/browse">
                    <FiFilm className="nav-icon"/>
                    <span className="nav-text"> >_./browse_movies</span>
                </Link>

                <Link to="/profile">
                    <FiUser className="nav-icon"/>
                    <span className="nav-text"> >_~/profile/sudo</span>
                </Link>
            </div>
            <div className={"navbar-right"}>
                <div className={"navbar-search-container"}>
                    <FiSearch className={"search-icon"} onClick={() => setSearchOpen(prev => !prev)}></FiSearch>
                    <input type={"text"} placeholder={"⌕ type film_name..."} className={`navbar-search ${searchOpen ? 'active' : ''}`} value={query} onChange={handleSearch}></input>
                </div>

                <div className={"navbar-divider"}></div>
                {user ? (
                    <div className="nav-profile-container" ref={dropdownRef}>
                        <div className="navbar-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img src={user.avatar || 'https://via.placeholder.com/40'} alt={user.username}/>
                        </div>

                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-info">LOGGED_IN: {user.username}</div>
                                <div className="terminal-divider"></div>
                                <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                                    VIEW_PROFILE
                                </Link>
                                <hr/>
                                <button className="logout-btn" onClick={handleLogout}>
                                    KILL_SESSION (LOGOUT)
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="btn-signin">
                        SIGN_IN
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;