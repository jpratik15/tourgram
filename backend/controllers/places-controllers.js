const mongoose = require('mongoose')
const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');
const {validationResult}  = require("express-validator");
const getCoordsForAddress = require('../util/location');

const Place = require('../models/place')
const User = require('../models/users')



const getPlaceByPlaceId = async (req,res,next)=>{
    const placeId = req.params.pid;
    let place;
    try{
        place = await Place.findById(placeId);
    }catch(err){
        const error = new HttpError("Couldn't Find Place",500);
        return next(error);
    }
    
    if(!place){
        return next(new HttpError("Could Not Find a place for the  given Id", 404 ));
    }
    res.json({place : place.toObject({getters : true})});
}


const getPlacesByUserId = async (req,res,next)=>{
    const userId  = req.params.uid;
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places');
        
    } catch (err) {
        const error = new HttpError("Couldn't Find Place",500);
        return next(error);
    }

    if(!userWithPlaces || userWithPlaces.places.length ===0){
        return next(new HttpError("Could Not Find a places for given userID", 404));
    }
    res.json({places : userWithPlaces.places.map(place => place.toObject({getters : true}))});  
}


const createPlace = async (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next( new HttpError("Invalid Input",422));
    }

    const {title,description,address,creator} = req.body;
    console.log(req.body);

    let coordinates;
    try {
        coordinates =  await getCoordsForAddress(address);
    } catch(error){
        return next(error);
    }

    const newPlace = new Place({
        title,
        description,
        address,
        location : coordinates,
        image : req.file.path,
        creator 
    })

    let user ;

    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError("Creating Place Failed",500);
        return next(error);
    }
    
    if(!user){
        const error = new HttpError("Coudln't Find User with User Id",404);
        return next(error);
    }


    try {

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newPlace.save({session : sess});
        user.places.push(newPlace);
        await user.save({session : sess});
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError("Creating Place Failed",500);
        return next(error);
    }
    
    
    res.status(201).json({place :  newPlace});
}


const updatePlaceById =async (req,res,next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return next( new HttpError("Invalid Input",422));
    }
    const {title,description} = req.body;
    const placeId = req.params.pid;
    
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError("Couldnt Update Place",500);
        return next(error);
    }
    
    place.title = title;
    place.description = description;
    
    try {
        await place.save();
    } catch(err){
        const error = new HttpError("Couldnt Update Place",500);
        return next(error);
    }
    
    
    res.status(201).json({place : place.toObject({getters : true})});
    
}

const deletePlace  = async (req,res,next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
        // console.log(place);
    } catch (err) {
        const error = new HttpError("Couldnt Delete Place",500);
        return next(error);
    }
    
    if(!place){
        return next(new HttpError("Couldn't find the place",404));
    }
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session : sess});
        await sess.commitTransaction();


    } catch (err) {
        const error = new HttpError("Couldnt Delete Place",500);
        return next(error);
    }
    res.status(201).json({message : "Deleted Successfully"});

    
}
exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById  = updatePlaceById;
exports.deletePlace = deletePlace;