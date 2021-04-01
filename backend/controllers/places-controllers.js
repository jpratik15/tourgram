const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');
const {validationResult}  = require("express-validator");
const getCoordsForAddress = require('../util/location');

const Place = require('../models/place')

// let DUMMY_PLACES = [
//     {
//         id : 'p1',
//         title : "Empire State Bldg",
//         description : "One of the Most Beautiful Bldg",
//         location : {
//             lat : 40,
//             lng : -73
//         },
//         address : "abcd",
//         creator : "u1"
//     }
// ]

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
    let places;
    try {
        places =await Place.find({ creator : userId});
        
    } catch (err) {
        const error = new HttpError("Couldn't Find Place",500);
        return next(error);
    }

    if(!places || places.length ===0){
        return next(new HttpError("Could Not Find a places for given userID", 404));
    }
    res.json({places : places.map(place => place.toObject({getters : true}))});  
}


const createPlace = async (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next( new HttpError("Invalid Input",422));
    }

    const {title,description,address,creator} = req.body;

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
        image : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdummyimage.com%2Fvga&imgrefurl=https%3A%2F%2Fdummyimage.com%2F&tbnid=D93anxCopUBhqM&vet=12ahUKEwjgsYrUwNzvAhVdhEsFHfXYAkEQMygAegUIARDVAQ..i&docid=nu_bPhQtkB_A4M&w=640&h=480&q=dummy%20image&ved=2ahUKEwjgsYrUwNzvAhVdhEsFHfXYAkEQMygAegUIARDVAQ",
        creator
    })

    try {
        await newPlace.save();
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
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError("Couldnt Delete Place",500);
        return next(error);
    }
    
    if(!place){
        return next(new HttpError("Couldn't find the place",404));
    }
    
    try {
        await place.remove();
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