var express = require('express');
var router = express.Router();

//Import controllers
//
var dogController = require('./controllers/dogController');

router.get('/api/dogs', [dogController.getAllDogs]);
router.get('/api/dogs/featured', [dogController.getFeaturedDogAsync]);
router.get('/api/dogs/id/:id', [dogController.getDogByIdAsync]);
router.get('/api/dogs/query', [dogController.getDogsByQueryAsync]);
//ANY route
//
router.get('*', (req, res) => {res.status(400).json({message:'resource does not exist'})});
module.exports = router;