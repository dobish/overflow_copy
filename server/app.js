const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();

/**** Configuration ****/
const port = (process.env.PORT || 8080);
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Only needed when running build in production mode


/**** Database ****/
// The "Kitten Data Access Layer".
const kittenDAL = require('./kitten_dal')(mongoose);

/**** Routes ****/
app.get('/api/kittens', (req, res) => {
    // Get all kittens. Put kitten into json response when it resolves.
    kittenDAL.getKittens().then(kittens => res.json(kittens));
});

app.get('/api/kittens/:id', (req, res) => {
    let id = req.params.id;
    kittenDAL.getKitten(id).then(kitten => res.json(kitten));
});

app.get('/api/kittens/answers/:id', (req, res) => {
   // console.log(req.params.id);
    let id = req.params.id;

    kittenDAL.getAnswers(id).then(kitten => res.json(kitten));
});

app.post('/api/kittens', (req, res) => {
    let kitten = {
        question : req.body.question,
        answers : req.body.answers
// Empty hobby array
    };
    kittenDAL.createKitten(kitten).then(newKitten => res.json(newKitten));
    //console.log(req.body.answers)
});

app.post('/api/kittens/:id/answers', (req, res) => {
    kittenDAL
        .addComment(req.params.id, req.body)
        .then(updatedquestion => res.json(updatedquestion));
});



app.put('/api/kittens/:id/answers/:answersId/', (req, res) => {
    kittenDAL
        .votes(req.params.id, req.params.answersId)
        .then(updateVotes => res.json(updateVotes));
    //console.log(updateVotes => res.json(updateVotes))
//kittenDAL.updateVotes(req.params.id, req.params.votes).then(updatedVotes => res.json(updatedVotes));
});



// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start ****/
const url = process.env.MONGO_URL || "mongodb://localhost/kitten_db";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        await kittenDAL.bootstrap(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`Kitten API running on port ${port}!`)
    })
    .catch(error => console.error(error));


//"mongodb+srv://dbAdmin:password@cluster0-vllvu.mongodb.net/test?retryWrites=true&w=majority"
//'mongodb://localhost/kitten_db'
