var express = require('express');
var router = express.Router();

//Import controllers
//
var authController = require('./controllers/authController');
var adminController = require('./controllers/adminController');
var dogController = require('./controllers/dogController');

//admin login routes
//
router.post('/api/admin/login', [authController.login]);
//protected API routes
//
router.post('/api/admin/test/:count', [authController.verifyToken, adminController.generateTestDataAsync]);
router.post('/api/admin/new', [authController.verifyToken, adminController.createDogAsync]);
router.post('/api/admin/update/', [authController.verifyToken, adminController.updateDogByIdAsync]);
router.post('/api/admin/setFeatured/:id', [authController.verifyToken, adminController.setFeaturedAsync]);
router.delete('/api/admin/delete', [authController.verifyToken, adminController.deleteAllDogAsync]);
router.delete('/api/admin/delete/:id', [authController.verifyToken, adminController.deleteDogByIdAsync]);
router.get('/api/admin/analytics', [authController.verifyToken, adminController.getAnalyticsReportAsync]);
//unprotected API routes
//
router.get('/api/dogs', [dogController.getAllDogsAsync]);
router.get('/api/dogs/count', [dogController.getDocCountAsync]);
router.get('/api/dogs/featured', [dogController.getFeaturedDogAsync]);
router.get('/api/dogs/id/:id', [dogController.getDogByIdAsync]);
router.get('/api/dogs/query', [dogController.getDogsByQueryAsync]);
router.get('/api/connection-test', (req, res) => { res.sendStatus(200); res.end(); });
//ANY route
//
router.get('*', (req, res) => { res.status(400).json({ message: 'resource does not exist' }) });
module.exports = router;