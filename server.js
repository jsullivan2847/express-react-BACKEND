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
        const people = await People.find({});
        res.send(people);
    } catch (error) {
        res.send(error);
    }
})

//callbackmethod
// app.get('/people', async (req,res) => {
//     People.find({}, (error,people) => {
//         res.send(people);
//     });
// })

//Create
app.post('/people', async (req,res) => {
    try{
        const person = await People.create(req.body);
        res.send(person);
    } catch (error) {
        res.status(400).json(error);
    }
});





//Listen
app.listen(PORT, () => {
    console.log('express is listening at', PORT)
});
