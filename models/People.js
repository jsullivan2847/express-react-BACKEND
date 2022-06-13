const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
    name:{required: true, type: String},
    image: String,
    title: String,
}, {timestamps: true});

const People = mongoose.model("People", peopleSchema);

module.exports = People;