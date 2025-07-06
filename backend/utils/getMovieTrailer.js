import axios from 'axios';


const getMovieTrailer = async (title, year) => {
  try {
    const query = `${title} ${year} official trailer`;

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 1,
        key: process.env.YOUTUBE_API_KEY, // Ensure this is set in your .env file
      },
    });

    const videoId = response.data.items[0]?.id?.videoId;

    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
      return null; // No trailer found
    }
  } catch (error) {
    console.error('Error fetching trailer:', error.message);
    return null;
  }
};

export default getMovieTrailer;
