const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({

    email: {
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        require: true,
        minlenght: 5
    },
    name: {
        type: String,
        require: true,
        maxlenght: 100
    },
    lastname: {
        type: String,
        require: true,
        maxlenght: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    resetToken: {
        type: String
    },
    resetTokenExp: {
        type: Number
    }
});

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){ // if they are not modifing data
        bcrypt.genSalt(SALT_I, function(error, salt) {
            if(error) { return next(error) }
    
            bcrypt.hash(user.password, salt, function(error, hash) {
                if(error) { return next(error) }
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    
    bcrypt.compare(candidatePassword, this.password, function(error, Match) {
        if(error) { return cb(error) }
        cb(null, Match);
    });
}

userSchema.methods.generateResetToken = function(cb) {
    var user = this;
    crypto.randomBytes(20, function(err, buffer) {
        var token = buffer.toString('hex');

        user.resetToken = token
        user.save(function(err, user) {
            if(error) { return cb(error) }
            cb(null, user)
        })
    })
}

userSchema.methods.generateToken = function( cb ){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save(function(error, user){
        if(error) { return cb(error) }
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET, function(error, decode){
        User.findOne({"_id": decode, "token": token}, function(error, user) {
            if(error) { return cb(error) }
            cb(null, user);
        });
    });

}

const User = mongoose.model('User', userSchema);

module.exports = { User }