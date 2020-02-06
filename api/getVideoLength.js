module.exports = (req, res) => {
    const axios = require('axios');
    const { videoId } = req.query;
    const apiKey = 'AIzaSyBDso4jJrCUzrs7yjudTO__cUtFUHOg2mY';
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails,statistics&key=${apiKey}`;
    axios.get(url)
        .then(response => {
            console.log("log");
            
            res.status(200).send(response);
        })
        .catch(error => {
            console.log("error");
            
            res.status(500).send(error);
        })
}