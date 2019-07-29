const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const itemRoutes = require('./api/route/items');

mongoose.connect('mongodb://localhost:27017/Files', {useNewUrlParser:true}, (err) => {
    if(!err){console.log('MongoDB Connection Succeeded.')}
    else {console.log('Error in DB connection : ' +err)}
});

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200/' }));

 app.use('/items', itemRoutes);

 app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

 module.exports = app; 