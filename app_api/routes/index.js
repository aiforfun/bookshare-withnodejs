(function () {
  var express = require('express');
  var router = express.Router();
  var jwt = require('express-jwt');
  var Recaptcha = require('express-recaptcha');
  var recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY);

  var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
  });
  var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
  var verifyRecaptcha = function(req, res, callback){
    if (!req.recaptcha.error){
      callback(req, res);
    } else {
      console.log(req.recaptcha);
      sendJsonResponse(res, 404, {
        "message": "Recaptcha is invalid"
      });
    }
  };

  var ctrlLocations = require('../controllers/locations');
  var ctrlReviews = require('../controllers/reviews');
  var ctrlAuth = require('../controllers/authentication');

  router.post('/register', recaptcha.middleware.verify, function(req, res){verifyRecaptcha(req, res, ctrlAuth.register);});
  router.post('/login', recaptcha.middleware.verify, function(req, res){verifyRecaptcha(req, res, ctrlAuth.login);});

  // locations
  router.get('/locations', ctrlLocations.locationsListByDistance);
  router.post('/locations', ctrlLocations.locationsCreate);
  router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
  router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
  router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

  // reviews ctrlReviews.reviewsCreate
  router.post('/locations/:locationid/reviews', auth, recaptcha.middleware.verify, function(req, res){
    verifyRecaptcha(req, res, ctrlReviews.reviewsCreate);
  });
  router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
  router.put('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne);
  router.delete('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne);

  // Testing porpuse
  var ctrlDemo = require('../controllers/demo');
  router.get('/demo/ok', ctrlDemo.demoOk);
  router.get('/demo/error', ctrlDemo.demoError);

  module.exports = router;

})();
