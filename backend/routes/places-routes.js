const express = require('express');
const bodyParser  = require('body-parser');

const router = express.Router();
const placeControllers = require("../controllers/places-controllers")


router.get("/:pid",placeControllers.getPlaceByPlaceId)

router.get("/user/:uid",placeControllers.getPlacesByUserId);

router.post("/",placeControllers.createPlace)

router.patch("/:pid", placeControllers.updatePlaceById);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router ;