var app = angular.module("authApp", ["firebase"]);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://jobcenter-id-auth.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);

// and use it in our controller
app.controller("AuthCtrl", ["$scope", "$rootScope", "Auth",
  function($scope, $rootScope, Auth) {
    $scope.createUser = function() {
      $rootScope.alert.message = null;
      $rootScope.error = null;

      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $rootScope.alert.message = "User created with uid: " + userData.uid;
      }).catch(function(error) {
        $rootScope.error = error;
      });
    };

    $scope.removeUser = function() {
      $rootScope.alert.message = null;
      $rootScope.error = null;

      Auth.$removeUser({
        email: $scope.email,
        password: $scope.password
      }).then(function() {
        $rootScope.alert.message = "User removed";
      }).catch(function(error) {
        $rootScope.error = error;
      });
    };
    
    $scope.authWithPassword = function() {
      $rootScope.alert.message = null;
      $rootScope.error = null;
      
      Auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData){
        $rootScope.alert.class = 'success';
        $rootScope.alert.message = "Authenticated successfully with payload: " + userData.uid;
      }).catch(function(error){
        if (error = "INVALID_EMAIL") {
          $rootScope.alert.class = 'danger';
          $rootScope.alert.message = 'You have entered an invalid username or password';
        // } else if (error = "INVALID_PASSWORD") {
        //   $rootScope.alert.class = 'danger';
        //   $rootScope.alert.message = 'You have entered an invalid password';
        } else {
          $rootScope.alert.class = 'danger';
          $rootScope.alert.message = error;
        }
      });
    };
  }
]);

app.controller('AlertCtrl', [
  '$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.alert = {};
  }
]);
