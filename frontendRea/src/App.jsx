import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home/Home.jsx';
import MovieDetail from './pages/MovieDetail/MovieDetail.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Search from './pages/Search/Search.jsx'
import "./App.css";
import './styles/variables.css'
import './styles/global.css'
import Browse from './pages/Browse/Browse.jsx'
import Login from './pages/Login/Login.jsx'
import Profile from './pages/Profile/Profile.jsx'
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header />
                            <Homepage />
                        </>
                    } />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/ScrollToTop" element={<ScrollToTop />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App