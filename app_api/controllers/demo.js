(function () {
  var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
  module.exports.demoOk = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success", "method" : "demoOk"});
  };
  module.exports.demoError = function (req, res) {
    sendJsonResponse(res, 404, {"status" : "success", "method" : "demoError"});
  };

})();
