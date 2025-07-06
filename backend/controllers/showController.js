import axios from 'axios'
import dotenv from 'dotenv';
import Movie from '../models.js/Movie.js';
dotenv.config();
import getMovieTrailer from '../utils/getMovieTrailer.js';
import Shows from '../models.js/Shows.js';

//get movie from tmdb api
export const getNowPlayingMovies = async (req, res) => {
    try {

        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
            {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_KEY}`
                }
            }
        );

        const movies = data?.results;
        res.json({ success: true, movies: movies });

    } catch (error) {
        console.log('error show controller: ' + error.message)
        res.json({ success: false, message: error.message });
    }
}

//api to add new show to the database
export const addShow = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body;

        let movie = await Movie.findById(movieId);

        if (!movie) {
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all(
                [axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_KEY}`
                        }
                    }),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_KEY}`
                        }
                    })
                ]
            )


            const movieApiData = movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data;

            const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                genres: movieApiData.genres,
                casts: movieCreditsData.cast,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || "",
                vote_average: movieApiData.vote_average,
                run_time: movieApiData.runtime,
                movie_trailer: await getMovieTrailer(movieApiData.title, movieApiData.release_date.split('-')[0])
            }

            //add movie to db
            movie = await Movie.create(movieDetails);
        }

        const showsToCreate = [];
        showsInput.forEach((show => {
            const showDate = show.date;
            show.time.forEach((time) => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                });
            });
        }));

        if(showsToCreate.length > 0){
           await Shows.insertMany(showsToCreate);
        }

        res.json({ success: true, message: "show added successfully" })
    } catch (error) {
        console.log("show controller: " + error.message);
        res.json({ success: false, message: error.message })
    }
}