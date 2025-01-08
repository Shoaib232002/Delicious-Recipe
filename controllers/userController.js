// controllers/userController.js
const userModel = require('../models/usermodel');
const fs = require('fs');
const path = require('path');

const { check, validationResult } = require('express-validator');
// Render login page
const renderLoginPage = (req, res) => {
    const errorMessage = req.query.error || null; // Get error message from query
    res.render('index', { errorMessage }); // Render login page with error message
  };
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('name email phone'); // Fetch only name, email, and phone
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
};

// Function to update user profile
const updateUserProfile = async (req, res) => {
  const { userId, name, email } = req.body; // Assuming you send userId, name, and email in the request body

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Render registration page
const renderRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'register.html'));
}
// Handle user registration
const registerUser = (req, res) => {
  const userData = req.body;
  userModel.createUser(userData, (err, results) => {
    if (err) {
      return res.status(500).send('Error registering user: ' + err.message);
    }
    res.redirect('home');
  });
};

// Render forgot password page
const renderForgotPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'forgot.html'));
};
// Render home page
const renderHomePage=(req, res) => {
    const errorMessage = req.query.error || null; // Get error message from query
    res.render('home', { errorMessage }); // Render login page with error message
  };


// Render 
const renderVegPage = (req, res) => {
  const errorMessage = req.query.error || null; // Get error message from query
    res.render('veg', { errorMessage }); // Render non veg page with error message
};
const renderNonVegPage = (req, res) => {
  const errorMessage = req.query.error || null; // Get error message from query
    res.render('nonveg', { errorMessage }); // Render veg page with error message
};
const renderSnacksPage = (req, res) => {
  const errorMessage = req.query.error || null; // Get error message from query
    res.render('snacks', { errorMessage }); // Render snacks page with error message
};

const renderaddRecipePage = (req, res) => {
  const errorMessage = req.query.error || null; // Get error message from query
    res.render('addRecipe', { errorMessage }); // Render veg page with error message
};

// Handle user login
const loginUser = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const query = 'SELECT * FROM user WHERE username = ? AND pwd = ?';

    userModel.connection.query(query, [username, password], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        // Successful login, redirect to home page
        res.redirect('/home');
        
      } else {
        // Invalid username or password
        res.redirect('/?error=Invalid username or password');
      }
    });
  }
];
// Handle forgot password
const handleForgotPassword = (req, res) => {
  const { email } = req.body;

  // Here you would typically find the user by email and send a reset link
  // For this example, we'll just simulate this step
  console.log(`Password reset link sent to: ${email}`);
  res.send(`A password reset link has been sent to ${email}.`);
};





// controllers/UserController.js

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


// Function to handle "forgot password"
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists in MySQL database
        const [shoaib] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (shoaib.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a random new password
        const newPassword = Math.random().toString(36).slice(-4);  // 8-character password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the MySQL database
        await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

        // Send the new password via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'shoaib232002@gmail.com',  // Replace with your email
                pass: 'Mohammed@123'    // Replace with your email password
            }
        });

        const mailOptions = {
            from: 'shoaib232002@gmail.com',
            to: email,
            subject: 'Your New Password',
            text: `Your new password is: ${newPassword}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'New password sent to your email' });
        console.alert('password sent');
    } catch (error) {
        console.error('Error handling forgot password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const displayRecipes = (req, res) => {
  userModel.Recipe.getAllRecipes((recipes) => {
      res.render('recipes', { recipes });
  });
};

// Add a new recipe
const addRecipe = (req, res) => {
  const { name, ingredients, instructions } = req.body;

  userModel.Recipe.addRecipe({ name, ingredients, instructions }, (result) => {
      res.redirect('/recipes');  // Redirect to recipes page after adding
  });
};



module.exports = {

  renderLoginPage,renderRecipesPage: displayRecipes,
  addRecipe,
  renderRegisterPage,
  registerUser,
  renderForgotPage,forgotPassword,renderaddRecipePage,
  handleForgotPassword,updateUserProfile,
  renderVegPage,renderNonVegPage,renderSnacksPage,
  renderHomePage,loginUser,updateUserProfile,getUserDetails
};