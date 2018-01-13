(function () {
  angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];
  function homeCtrl ($scope, loc8rData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
      content: "Looking for wifi and a seat etc etc"
    };
    vm.message = "Checking your location";

    vm.getData = function (position) {
      console.log("Your location: ");
      console.log(position);

      vm.message = "Searching for nearby places";

      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      loc8rData.locationByCoords(lat, lng)
        .then(function (response){
          vm.message = response.data && response.data.length > 0 ? "" : "No locations found";
          vm.data = { locations: response.data };
        }, function (error) {
          vm.message = "Sorry, something's gone wrong ";
        });
    };

    vm.showError = function (error) {
      vm.defaultLocation();
      // $scope.$apply(function() {
      //   vm.message = error.message;
      // });
    };

    vm.noGeo = function () {
      vm.defaultLocation();
      // $scope.$apply(function() {
      //   vm.message = "Geolocation not supported by this browser.";
      // });
    };

    vm.defaultLocation = function(){
      var defaulPosition = {"coords": {"latitude": 1.350351, "longitude": 103.873564}};
      vm.getData(defaulPosition);
    };

    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
  };

})();
