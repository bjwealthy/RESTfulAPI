const mongoose = require('mongoose');
//our data schema
const recipeSchema = mongoose.Schema({
    title: {type: String, required: true},
    ingredients: {type: String, required: true},
    instructions: {type: String, required: true},
    time: {type: Number, required: true},
    difficulty: {type: Number, required: true},
});

//by using mongoose, we shall model every recipe using the 'recipeSchema' model:
module.exports = mongoose.model('Recipe', recipeSchema);