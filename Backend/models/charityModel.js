const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema({
    CharityName: {
        type: String,
        required: true
    },
    ContactInformation: {
        type: String,
        required: true
    },
    Hotline: {
        type: Number,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Mission: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
}
});
let charity = mongoose.model("charity", charitySchema);

module.exports = charity;
