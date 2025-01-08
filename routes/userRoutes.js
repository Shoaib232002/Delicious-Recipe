const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/',userController.renderLoginPage);
router.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','register.html'));
});
router.get('/forgot',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','forgot.html'));
});
// Set static folder for public assets like CSS, JS
router.use(express.static(path.join(__dirname, 'public')));
router.post('/addrecipes', userController.addRecipe);         // Add a new recipe
router.get('/addrecipes', userController.renderaddRecipePage);   
router.post('/forgot-password', userController.forgotPassword);
router.get('/forgot-password', userController.forgotPassword);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/home', userController.renderHomePage);
router.get('/loginpage', userController.renderLoginPage);
router.post('/forgot',userController.handleForgotPassword);
router.get('/veg',userController.renderVegPage);
router.get('/nonveg',userController.renderNonVegPage);
router.get('/snacks',userController.renderSnacksPage);
router.get('/recipes', userController.renderRecipesPage);
module.exports = router;
