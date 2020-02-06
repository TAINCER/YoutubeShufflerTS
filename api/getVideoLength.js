module.exports = async (req, res) => {
    const axios = require('axios');
    const { videoId } = req.query;
    const apiKey = 'AIzaSyBDso4jJrCUzrs7yjudTO__cUtFUHOg2mY';
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails,statistics&key=${apiKey}`;
    const result = await axios.get(url);
    res.status(200).json(result)
}