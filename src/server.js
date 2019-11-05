const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Stackoverflow', {

    useNewUrlParser: true,
    useUnifiedTopology: true
}.then((connection) => { // When the Promise resolves, we do some stuff.
    console.log("Database connected");
    //doStuff();
})).then(r => {console.log("database connected")});