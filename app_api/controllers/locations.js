var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

// Test DATA
// Doube Ghout: lng=103.84582&lat=1.299151
// Comcenter: lng: 103.83796619999998, lat=1.2997376999999999

var theEarth = (function(){
  var earthRadius = 6371; // km, miles is 3959
  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };
  var getRadsFromDistance = function(distance) {
      return parseFloat(distance / earthRadius);
  };
  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var meterConversion = (function() {
    var mToKm = function(distance) {
        return parseFloat(distance / 1000);
    };
    var kmToM = function(distance) {
        return parseFloat(distance * 1000);
    };
    return {
        mToKm : mToKm,
        kmToM : kmToM
    };
})();

module.exports.locationsListByDistance = function (req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: meterConversion.kmToM(20), //distance to 20 km
    num: 10
  };

  if (!lng || !lat) {
    sendJsonResponse(res, 404, {
      "message": "lng and lat query parameters are required"
    });
    return;
  }


  Loc.geoNear(point, geoOptions, function (err, results, stats) {
    var locations = [];

    if (results){
      results.forEach(function(doc) {
        locations.push({
          distance: doc.dis,
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      sendJsonResponse(res, 200, locations);
    } else {
      sendJsonResponse(res, 200, {});
    }
  });
};
module.exports.locationsCreate = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success", "method" : "locationsCreate"});
};
module.exports.locationsReadOne = function (req, res) {
  if (req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) {
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }

        sendJsonResponse(res, 200, location);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No locationid in request"
    });
  }
};
module.exports.locationsUpdateOne = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success", "method" : "locationsUpdateOne"});
};
module.exports.locationsDeleteOne = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success", "method" : "locationsDeleteOne"});
};
