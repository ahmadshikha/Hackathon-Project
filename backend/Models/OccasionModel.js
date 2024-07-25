const { Schema, model } = require("mongoose");

const OccasionSchema = new Schema({
    occasionName: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, "Occasion name is required."],
        minlength: [3, "Occasion name must be at least 3 characters long."],
        maxlength: [25, "Occasion name cannot exceed 25 characters."],
    },
    occasionPrice: {
        type: Number,
        required: [true, "Occasion price is required."],
    },
    categoryId: {
        type: String,
        required: [true, "Occasion Categorys ID is required."]
    }
}, {
    timestamps: true
});

const Occasion = model("Occasion", OccasionSchema);

module.exports = Occasion;
