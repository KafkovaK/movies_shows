import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setBio(parsed.bio || "");
        }
    }, []);

    const handleSave = () => {
        const updatedUser = { ...user, bio };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
    };

    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-title">>_ ~/user/profile</div>

                <div className="profile-section">
                    <h3>auth_required.sys</h3>
                    <p>You must sign in to access this page.</p>

                    <Link to="/login" className="profile-btn">
                        SIGN_IN
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-title">>_ ~/user/profile</div>

            {/* cards that show user info */}
            <div className="profile-card">
                <div className="profile-avatar">
                    <img src={user.avatar} alt={user.username} />
                </div>

                <div className="profile-info">
                    <h2>{user.username}</h2>
                    <p>{user.email || "no_email@set"}</p>
                </div>
            </div>

            {/* editable bio */}
            <div className="profile-section">
                <h3>bio.txt</h3>
                {isEditing ? (
                    <>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="profile-textarea"
                        />
                        <button className="profile-btn" onClick={handleSave}>
                            SAVE
                        </button>
                    </>
                ) : (
                    <>
                        <p>{user.bio || "No bio yet."}</p>
                        <button
                            className="profile-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            EDIT
                        </button>
                    </>
                )}
            </div>

            {/* favourite movies */}
            <div className="profile-section">
                <h3>favorites.list</h3>
                {user.favorites?.length > 0 ? (
                    <ul>
                        {user.favorites.map((movie, i) => (
                            <li key={i}>{movie}</li>
                        ))}
                    </ul>
                ) : (
                    <p>empty</p>
                )}
            </div>

            {/* card that shows users activity */}
            <div className="profile-section">
                <h3>activity.log</h3>
                {user.activity?.length > 0 ? (
                    <ul>
                        {user.activity.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No activity yet.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;