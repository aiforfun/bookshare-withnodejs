(function () {

  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', '$location', '$modal', 'loc8rData', 'authentication'];
  function locationDetailCtrl ($routeParams, $location, $modal, loc8rData, authentication) {
    var vm = this;
    vm.locationid = $routeParams.locationid;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    loc8rData.locationById(vm.locationid)
      .then(function (response){
        vm.data = { location: response.data };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      }, function (error) {
        console.log(e);
      });

    vm.popupReviewForm = function () {
      var modalInstance = $modal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve : {
          locationData : function () {
            return {
              locationid : vm.locationid,
              locationName : vm.data.location.name
            };
          }
        }
      });
      modalInstance.result.then(function (result) {
        console.log(result.data);
        vm.data.location.reviews.push(result.data);
      });
    };
  }
})();
