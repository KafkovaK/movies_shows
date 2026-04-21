import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'
import { users } from '../../../../backendExpr/usersData.js'

// for login and registration
function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
        username: "", email: "", password: "", confirmPassword: ""
    });
    // sends login request to backend
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!loginData.email || !loginData.password) {
            setError("Please fill in all fields");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
                return;
            }
            // stores user in localstorage
            const existing = JSON.parse(localStorage.getItem("user"));
            const userWithProfile =
                existing && existing.email === data.user.email
                    ? existing
                    : {
                        ...data.user,
                        bio: "",
                        favorites: [],
                        activity: []
                    };
            localStorage.setItem("user", JSON.stringify(userWithProfile));
            navigate("/profile");
        } catch (err) {
            setError("Something went wrong");
        }
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        if (!registerData.username || !registerData.email || !registerData.password) {
            setError("Please fill in all fields");
            return;
        }
        if (registerData.password !== registerData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (registerData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData)
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
                return;
            }
            setSuccess("Registration successful! You can now log in.");
            setIsLogin(true);
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                {/* LOGO */}
                <Link to="/" className="login-logo">⚙ 404://stream</Link>

                {/* TABS */}
                <div className="login-tabs">
                    <button
                        className={`login-tab ${isLogin ? 'tab-active' : ''}`}
                        onClick={() => { setIsLogin(true); setError(""); }}
                    >
                        LOGIN
                    </button>
                    <button
                        className={`login-tab ${!isLogin ? 'tab-active' : ''}`}
                        onClick={() => { setIsLogin(false); setError(""); }}
                    >
                        REGISTER
                    </button>
                </div>

                {/* ERROR or SUCCESS */}
                {error && <p className="login-error">⚠ {error}</p>}
                {success && <p className="login-success">✓ {success}</p>}

                {/* LOGIN FORM */}
                {isLogin ? (
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>EMAIL</label>
                            <input
                                type="email"
                                placeholder="user@404stream.com"
                                value={loginData.email}
                                onChange={e => setLoginData({...loginData, email: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>PASSWORD</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={e => setLoginData({...loginData, password: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn-primary login-btn">
                            ▷ EXECUTE_LOGIN
                        </button>
                    </form>
                ) : (
                    /* REGISTER FORM */
                    <form className="login-form" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>USERNAME</label>
                            <input
                                type="text"
                                placeholder="netrunner_name"
                                value={registerData.username}
                                onChange={e => setRegisterData({...registerData, username: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>EMAIL</label>
                            <input
                                type="email"
                                placeholder="user@404stream.com"
                                value={registerData.email}
                                onChange={e => setRegisterData({...registerData, email: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>PASSWORD</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={registerData.password}
                                onChange={e => setRegisterData({...registerData, password: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>CONFIRM PASSWORD</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={registerData.confirmPassword}
                                onChange={e => setRegisterData({...registerData, confirmPassword: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn-primary login-btn">
                            ▷ CREATE_ACCOUNT
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login