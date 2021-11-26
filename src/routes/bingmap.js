const express = require('express');
const router = express.Router();
const BingMapController = require('../app/controllers/BingMapController');

router.use('/coordinates', BingMapController.getCoordinatesByAddress);

router.use('/distance/coordinates', BingMapController.getDistanceByCoordinates);

router.use('/distance', BingMapController.getDistanceByAddress);


module.exports = router;