const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');
const {validationResult}  = require("express-validator");
const User = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers =async (req,res,next)=> {
    let users;
    try {
        users = await User.find({},'-password');
    } catch (err) {
        const error = new HttpError("Fetching Users failed" , 500);
        return next(error);
    }

    res.json({users : users.map(user =>user.toObject({getters:true}))});

}

const signup = async (req, res, next)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next( new HttpError("Invalid Input",422));
    }
    
    const {name,email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email : email});
    } catch (err) {
        return next( new HttpError("Signing Up Failed",500));
    }
    if(existingUser){
        const error = new HttpError("User Exists Already , Please Login Instead" , 422);
        return next(error);
    }
    let hashed ;
    try {
        hashed = await bcrypt.hashed(password, 12 );
    } catch (err) {
        const error = new HttpError("Could not creat a new user",500);
        return error;
    }

    
    const new_user = new User({
        name,
        email,
        image:  req.file.path,
        password  : hashed,
        places : []
    })

    try {
        await new_user.save();
    } catch (err) {
        const error = new HttpError("Signing Up Failed",500);
        return next(error);
    }
    
    let token;
    try {
        token = jwt.sign({userId : new_user.id,email : new_user.email},"private_key",{expiresIn:'1h'});

    } catch (err) {
        const error = new HttpError("Signing Up Failed",500);
        return next(error);
        
    }

    res.status(201).json({userId : new_user.id,email : new_user.email,token:token});

}

const login = async (req,res,next)=> {
    const {email,password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email : email});
    } catch (err) {
        return next( new HttpError("Loggin  Up Failed",500));
    }

    
    if(!existingUser){
        return next( new HttpError("Invalid Credentials",401));
    }
    
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password,existingUser.password);
    } catch (err) {
        return next( new HttpError("Invalid Credentials",500));
    }
    if(!isValidPassword){
        return next( new HttpError("Invalid Credentials",401));
    }
    let token;
    try {
        token = jwt.sign({userId : existingUser.id,email : existingUser.email},"private_key",{expiresIn:'1h'});

    } catch (err) {
        const error = new HttpError("Logging In Failed",500);
        return next(error);
        
    }
    
    res.json({userId : existingUser.id ,email : existingUser.email, token: token});

}
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
