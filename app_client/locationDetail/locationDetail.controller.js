(function () {

  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', '$modal', 'loc8rData'];
  function locationDetailCtrl ($routeParams, $modal, loc8rData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

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
