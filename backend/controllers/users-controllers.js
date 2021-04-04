const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');
const {validationResult}  = require("express-validator");
const User = require("../models/users");


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
    
    const new_user = new User({
        name,
        email,
        image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGoogle_Photos&psig=AOvVaw3iqaXZT_86nJm8PMIALwEH&ust=1617455700179000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiYv5XS3-8CFQAAAAAdAAAAABAD",
        password,
        places : []
    })

    try {
        await new_user.save();
    } catch (err) {
        const error = new HttpError("Signing Up Failed",500);
        return next(error);
    }

    res.status(201).json({user:new_user.toObject({getUsers:true})});
}

const login = async (req,res,next)=> {
    const {email,password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email : email});
    } catch (err) {
        return next( new HttpError("Loggin  Up Failed",500));
    }
    
    if(!existingUser || existingUser.password !== password){
        return next( new HttpError("Invalid Credentials",401));
    }

    res.json({message : "Logged In"});

}
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
