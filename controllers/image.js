const Clarifai = require('clarifai');

// eg.: http://facedetection.jaysalvat.com/img/faces.jpg
// Don't use the API key on the front-end
const app = new Clarifai.App({
    apiKey: 'd503ae45055e40c7ab73f42be57b1471'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input,
        )
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    // increase image entries by 1
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            console.log(entries[0])
            res.json(entries[0])

        })
        .catch(err => res.status(400).json('unable to get entries'))

}

module.exports = {
    handleApiCall, handleImage
}