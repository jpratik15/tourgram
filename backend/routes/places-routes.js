const express = require('express');
const bodyParser  = require('body-parser');

const router = express.Router();
const HttpError = require("../models/http-error")

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

router.get("/:pid",(req,res,next)=>{
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find( p =>{
        return p.id ===placeId;
    })

    if(!place){
        return next(new HttpError("Could Not Find a placefor the  given Id", 404 ));
    }
    res.json({place});
})


router.get("/user/:uid",(req,res,next)=>{
    const userId  = req.params.uid;
    const place = DUMMY_PLACES.find( p =>{
        return p.creator === userId;
    })
    if(!place){
        return next(new HttpError("Could Not Find a place for given userID", 404));
    }
    res.json({place});  
})

module.exports = router ;