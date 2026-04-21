import express from "express";
const app = express();
const PORT = 5000;
import cors from "cors";
import movieRoute from "./movies.js";
import {fetchPopularMovies} from "./apiService.js";
import usersRoute from "./usersRoute.js";

// cors => for communication between react and express
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// first test to see if it works
// it's not used anywhere
app.get("/movies", async (req, res) => {
    try {
        const data = await fetchPopularMovies();
        res.json(data.results);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch movies"});
    }
});

app.use("/api/movies", movieRoute);

// server start
// express uses port 5000
app.listen(5000, () => {
    console.log("Server running on  http://localhost:" + 5000);
});


app.use("/api/users", usersRoute);