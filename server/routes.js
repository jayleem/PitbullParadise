var express = require('express');
var router = express.Router();

//Import controllers
//
var authController = require('./controllers/authController');
var adminController = require('./controllers/adminController');
var dogController = require('./controllers/dogController');

//admin login routes
//
router.post('/admin/login', [authController.login]);
//protected API routes
//
router.post('/admin/test/:count', [authController.verifyToken, adminController.generateTestDataAsync]);
router.post('/admin/new', [authController.verifyToken, adminController.createDogAsync]);
router.post('/admin/update/', [authController.verifyToken, adminController.updateDogByIdAsync]);
router.post('/admin/setFeatured/:id', [authController.verifyToken, adminController.setFeaturedAsync]);
router.delete('/admin/delete', [authController.verifyToken, adminController.deleteAllDogAsync]);
router.delete('/admin/delete/:id', [authController.verifyToken, adminController.deleteDogByIdAsync]);
router.get('/admin/analytics', [authController.verifyToken, adminController.getAnalyticsReportAsync]);
//unprotected API routes
//
router.get('/dogs', [dogController.getAllDogsAsync]);
router.get('/dogs/count', [dogController.getDocCountAsync]);
router.get('/dogs/featured', [dogController.getFeaturedDogAsync]);
router.get('/dogs/id/:id', [dogController.getDogByIdAsync]);
router.get('/dogs/query', [dogController.getDogsByQueryAsync]);
router.get('/connection-test', (req, res) => {res.sendStatus(200);res.end();});
//API resource not found
//
router.get('*', (req, res) => {res.status(504).json({'message':'resource not found.'});res.end();});

module.exports = router;