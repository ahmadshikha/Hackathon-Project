const { Schema, model } = require("mongoose");

// Define Occasions Schema
const occasionPlacesSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    }
});

// Create model
const Occasion = model("OccasionPlaces", occasionPlacesSchema);

module.exports = Occasion;
