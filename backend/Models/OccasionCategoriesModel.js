const { Schema, model } = require("mongoose");

const occasionCategorySchema = new Schema({
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

//? Create model
const OccasionCategory = model("OccasionCategory", occasionCategorySchema);

module.exports = OccasionCategory;
