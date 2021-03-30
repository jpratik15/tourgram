const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');


const DUMMY_USERS = [
    {   
        id : 'u1',
        name : 'Pratik Jain',
        email : 'abcd@fdaf.com',
        password : 'admin'
    }
]
const getUsers = (req,res,next)=> {
    res.json({users : DUMMY_USERS})
}

const signup = (req,res,next)=> {
    const {name,email,password} = req.body;

    const hasUser = DUMMY_USERS.find(p => p.email ===email);
    if(hasUser){
        return next(new HttpError("User email already registered",422))
    }
    const new_user = {
        id : uuidv4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(new_user);
    res.status(201).json({user:new_user});
}

const login = (req,res,next)=> {
    const {email,password} = req.body;

    const identifiedUser = DUMMY_USERS.find( p => p.email ===email);

    if(!identifiedUser || identifiedUser.password !==password){
        return next(new HttpError("Cannot Log In, wrong credentials!"),401);
    }

    res.json({message : "Logged In"});

}
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
