const { createElement } = require("react");
const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');

const DUMMY_PLACES = [
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

exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;