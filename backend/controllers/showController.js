import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();
export const getNowPlayingMovies = async (req, res) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_KEY}`
            }
        };
        const moviesNow = await axios.get(url,options);
        const data = await moviesNow.data;
        
    } catch (error) {

    }
}

getNowPlayingMovies();