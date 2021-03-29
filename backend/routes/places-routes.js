const express = require('express');
const bodyParser  = require('body-parser');

const router = express.Router();
const placeControllers = require("../controllers/places-controllers")


router.get("/:pid",placeControllers.getPlaceByPlaceId)

router.get("/user/:uid",placeControllers.getPlaceByUserId);

router.post("/",placeControllers.createPlace)

module.exports = router ;