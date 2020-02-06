module.exports = (req, res) => {
    const axios = require('axios');
    const { videoId } = req.query;
    const apiKey = 'AIzaSyBDso4jJrCUzrs7yjudTO__cUtFUHOg2mY';
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails,statistics&key=${apiKey}`;
    axios.get(url)
    .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).send(error.message);
      })
}