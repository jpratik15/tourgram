const express = require('express');
const bodyParser  = require('body-parser');

const { check } = require('express-validator')

const router = express.Router();
const placeControllers = require("../controllers/places-controllers")
const fileUpload = require("../middleware/file-uploads")
const checkAuth = require("../middleware/check-auth")

router.get("/:pid",placeControllers.getPlaceByPlaceId)

router.get("/user/:uid",placeControllers.getPlacesByUserId);

router.use(checkAuth)

router.post("/",fileUpload.single('image'),[check('title').not().isEmpty(),check('description').isLength({min : 5})],placeControllers.createPlace)

router.patch("/:pid",[check('title').not().isEmpty(),check('description').isLength({min : 5})], placeControllers.updatePlaceById);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router ;

