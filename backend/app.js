//Mongdb connection: mongodb+srv://bjwealthy:<password>@cluster0-odz6x.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://bola:<password>@cluster0-ivg96.mongodb.net/test?retryWrites=true&w=majority
const express = require('express');
const app = express();
module.exports = app;

//import body parser
const bodyParser = require('body-parser');
//convert the body into a usable json object:
app.use(bodyParser.json());

//import mongoose into app
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

mongoose.connect('mongodb+srv://bola:sokot777so18599@cluster0-ivg96.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to BJ\'s MongoDB Atlas!');
    })
    .catch((eror) => {
        console.log('Unable to connect to BJ\'s MongoDB Atlas!');
        console.error(error);     
    });


//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



//post route for creating a recipe
app.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe({
        //id field is generated automatically by mongo
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        time: req.body.time,
        difficulty: req.body.difficulty
//the save() method returns a promise so we can have a then() block 
//that will send the response back to the frontend.   
    });
    recipe.save().then(
        () => { //bcos this is sending an http request, we always need to send a response back to prevent the request from timing out 
            res.status(201).json({
                message: 'Recipe created successfully!'
            });
        } 
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//route for displaying all things recipes
app.use('/api/recipes', (req, res, next) => {
    Recipe.find().then(
        (recipeAll) => {
            res.status(200).json(recipeAll);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error   
            });
        }
    );
});


//route for displaying one recipe: id is a variable/dynamic part of the path, so we do :id
app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({
        _id: req.params.id //to access a dynamic variable we use 'params'
    }).then(
        (recipeOne) => {
            res.status(200).json(recipeOne);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

//update or modify a recipe: using a 'put' request:
app.put('/api/recipes/:id', (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
        _id: req.params.id  
    });
    Recipe.updateOne({_id: req.params.id}, recipe).then(
        () => {
            res.status(201).json({
                message: 'Updated!'
            });
        }
    ).catch(
        (eror) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//delete a recipe:
app.delete('/api/recipes/:id', (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});




