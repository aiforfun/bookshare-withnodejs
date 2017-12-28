(function () {
  angular
    .module('loc8rApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location','authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;
    vm.pageHeader = {
      title: 'Create a new Loc8r account'
    };
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';
    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email ||
        !vm.credentials.password || !vm.grecaptcharesponse) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doRegister();
      }
    };
    vm.doRegister = function() {
      vm.formError = "";
      vm.credentials["g-recaptcha-response"] = vm.grecaptcharesponse;
      authentication
        .register(vm.credentials)
        .then(
          function(){
            $location.search('page', null);
            $location.path(vm.returnPage);
          },
          function(err){
            if (err.data && err.data.message){
              vm.formError = err.data.message;
            } else {
              vm.formError = err;
            }
          }
        );
    };
  }
})();
