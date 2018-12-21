const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
// dotenv make .env available in the entire app
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Models

const { User } = require('./models/user');

// Middlewares

const { auth } = require('./middleware/auth');

// ========================================
//                  USERS
// ========================================

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    });
});

app.post('/api/users/register', (req, res) => {
        const user = new User(req.body);
        user.save((error, doc) => {
            if(error) { return res.json({success: false, error}) }
            res.status(200).json({success: true})
        });
})


app.post('/api/users/login', (req, res) => {
    
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) { return res.json({loginSuccess: false, message:'Auth failed, email not found'}) }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){ return res.json({loginSuccess: false, message: 'Wrong password'}) }

            user.generateToken((error, user) => {
                if(error) { return res.status(400).send(error) }
                res.cookie('w_auth', user.token).status(200).send({
                    loginSuccess: true
                });
            });
        });
    });

    
    
});


app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (error, doc) => {
        if(error) { return res.json({success: false, error}) }
        return res.status(200).send({
            success: true
        });
    });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});