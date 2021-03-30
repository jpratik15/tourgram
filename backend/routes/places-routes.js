const express = require('express');
const bodyParser  = require('body-parser');

const { check } = require('express-validator')

const router = express.Router();
const placeControllers = require("../controllers/places-controllers")


router.get("/:pid",placeControllers.getPlaceByPlaceId)

router.get("/user/:uid",placeControllers.getPlacesByUserId);

router.post("/",[check('title').not().isEmpty(),check('description').isLength({min : 5})],placeControllers.createPlace)

router.patch("/:pid",[check('title').not().isEmpty(),check('description').isLength({min : 5})], placeControllers.updatePlaceById);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router ;