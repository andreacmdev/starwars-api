const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());
const port = 3000;
mongoose.connect('mongodb+srv://dedev:EbxYJTAlQOhh6n3h@starwars-api.hfoyerl.mongodb.net/?retryWrites=true&w=majority&appName=starwars-api')

const Film = mongoose.model('Films', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
});

app.get('/', async (req, res) => {
    const films = await Film.find();
    res.send(films);
})

app.post('/', async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    await film.save();
    res.send(film);
})

app.delete('/:id', async (req, res) => {
    const film = await Film.findByIdAndDelete(req.parmams.id);
    res.status(200).send('filme excluído')
})

app.listen(port, () => {
    console.log('Servidor rodando');
})