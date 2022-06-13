//dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const People = require('./models/People.js');
const app = express();

//Dotenv
require('dotenv').config();
const {PORT, MONGODB_URL} = process.env;

//DATABASE CONNECT
mongoose.connect(MONGODB_URL);
const db = mongoose.connection;
db.on('connected', () => console.log('mongo connnected'));
db.on('disconnected', () => console.log('disconnected'));
db.on('error', (error) => console.log('somethings wrong', error));

//MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.get('/', (req,res) => {
    res.send('working');
});

//Index
app.get('/people', async (req,res) => {
    try{
        res.json(await People.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

//Create
app.post('/people', async (req,res) => {
    try{
        res.json(await People.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});





//Listen
app.listen(PORT, ()=> {
    console.log('express is listening at', PORT)
});
