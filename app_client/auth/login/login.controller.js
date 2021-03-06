(function () {
  angular
    .module('loc8rApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location','authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;
    vm.pageHeader = {
      title: 'Sign in to Loc8r'
    };
    vm.credentials = {
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';
    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.grecaptcharesponse || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };
    vm.doLogin = function() {
      vm.formError = "";
      vm.credentials["g-recaptcha-response"] = vm.grecaptcharesponse;
      authentication
        .login(vm.credentials)
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
