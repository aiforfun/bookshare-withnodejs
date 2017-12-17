(function () {
  angular
    .module('loc8rApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$modalInstance', 'loc8rData', 'locationData'];
  function reviewModalCtrl ($modalInstance, loc8rData, locationData) {
    var vm = this;
    vm.locationData = locationData;
    vm.modal = {
      close : function (result) {
        $modalInstance.close(result);
      },
      cancel : function () {
        $modalInstance.dismiss('cancel');
        $modalInstance.result.then(function() {
            console.log('Modal closed');
          },
          function() {
            console.log('Failed to close modal');
          }
        );
      }
    };
    vm.onSubmit = function () {
      vm.formError = "";
      if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddReview(vm.locationData.locationid, vm.formData);
        console.log(vm.formData);
        return false;
      }
    };
    vm.doAddReview = function (locationid, formData) {
      loc8rData.addReviewById(locationid, {
        author : formData.name,
        rating : formData.rating,
        reviewText : formData.reviewText
      }).then(function (data){
        console.log("Success!");
        vm.modal.close(data);
      }, function (error) {
        console.log(error);
        vm.formError = "Your review has not been saved, try again";
      });
      return false;
    };
  }
})();
