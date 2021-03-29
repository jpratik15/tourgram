const { createElement } = require("react");
const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');

let DUMMY_PLACES = [
    {
        id : 'p1',
        title : "Empire State Bldg",
        description : "One of the Most Beautiful Bldg",
        location : {
            lat : 40,
            lng : -73
        },
        address : "abcd",
        creator : "u1"
    }
]

const getPlaceByPlaceId = (req,res,next)=>{
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find( p =>{
        return p.id ===placeId;
    })

    if(!place){
        return next(new HttpError("Could Not Find a placefor the  given Id", 404 ));
    }
    res.json({place});
}


const getPlaceByUserId = (req,res,next)=>{
    const userId  = req.params.uid;
    const place = DUMMY_PLACES.find( p =>{
        return p.creator === userId;
    })
    if(!place){
        return next(new HttpError("Could Not Find a place for given userID", 404));
    }
    res.json({place});  
}


const createPlace = (req,res,next) => {
    const {title,description,coordinates,address,creator} = req.body;
    const newPlace = {
        id: uuidv4(),
        title,
        description,
        location : coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(newPlace);
    res.status(201).json({place :  newPlace});
}


const updatePlaceById = (req,res,next) => {
    const {title,description} = req.body;
    const placeId = req.params.pid;

    const updatePlace  = {...DUMMY_PLACES.find(p => p.id===placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id===placeId);
    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex] = updatePlace;
    res.status(201).json({place :updatePlace});

}

const deletePlace  = (req,res,next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(201).json({message : "Deleted Successfully"});

}
exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById  = updatePlaceById;
exports.deletePlace = deletePlace;