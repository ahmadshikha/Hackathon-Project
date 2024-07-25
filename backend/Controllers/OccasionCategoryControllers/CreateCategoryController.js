const OccasionCategory = require('../../Models/OccasionCategoryModel')

//* Importing Constants Messages
const {
    CATEGORY_NAME_EXISTS,
} = require("../../Constants/OccasionCategory/CreateCategoryMessages");
//* Importing Constants Messages *\\


//? Separate method to check if category name exists
const checkCategoryExists = async (categoryName) => {
    const existingCategory = await OccasionCategory.findOne({ categoryName });

    if (existingCategory) {
        throw new Error(CATEGORY_NAME_EXISTS);
    }
};

//? Separate method to create a new category
const createCategory = async (categoryName, categoryImageUrl) => {
    const newCategory = new OccasionCategory({ categoryName, categoryImageUrl });
    await newCategory.save();
    return newCategory;
};


module.exports = {
    checkCategoryExists,
    createCategory
}