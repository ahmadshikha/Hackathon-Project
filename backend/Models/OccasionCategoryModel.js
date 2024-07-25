const { Schema, model } = require("mongoose");

const occasionCategorySchema = new Schema({
    categoryName: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, "Category name is required."],
        minlength: [3, "Category name must be at least 3 characters long."],
        maxlength: [50, "Category name cannot exceed 50 characters."],
    },
    categoryImageUrl: {
        type: String,
        required: false,
        match: [/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/, "Invalid image URL format."],
    }
}, {
    timestamps: true
});

const OccasionCategory = model("OccasionCategorys", occasionCategorySchema);

module.exports = OccasionCategory;
