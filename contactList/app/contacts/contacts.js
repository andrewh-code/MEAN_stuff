'use strict';

angular.module('contactList.contacts', ['ngRoute', 'firebase'])   // inject the dependencies

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'contactsCtrl'
  });
}])

.controller('contactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    // call the firebase api to retrieve the contacts
    var ref = firebase.database().ref('contacts');
    $scope.contacts = $firebaseArray(ref);

    //console.log($scope.contacts);

    // add functions
    $scope.showAddForm = function(){
      $scope.addFormShow = true;    // the ng-show="addFormShow" tag in the contacts.html will be set to true and then show the form (must be on button-click though)

    }

    $scope.hide = function(){
        $scope.addFormShow = false;
    }

    $scope.addFormSubmit = function() {
      
        // need to have a value for each value before sending to firebase (if empty variable, set it to null)
        var name;
        var email;
        var company;
        var workPhone;
        var mobilePhone;
        var homePhone;
        var streetAddress;
        var city;
        var province;
        var zipCode;
        var github;
        var linkedin;

        if ($scope.name){name = $scope.name;}else{name = null;}
        if ($scope.email){email = $scope.email;}else{email = null;}
        if ($scope.company){company = $scope.company;}else{company = null;}
        if ($scope.workPhone){workPhone = $scope.workPhone;}else{workPhone = null;}
        if ($scope.mobilePhone){mobilePhone = $scope.mobilePhone;}else{mobilePhone = null;}
        if ($scope.homePhone){homePhone = $scope.homePhone;}else{homePhone = null;}
        if ($scope.streetAddress){streetAddress = $scope.streetAddress;}else{streetAddress = null;}
        if ($scope.city){city = $scope.city;}else{city = null;}
        if ($scope.province){province = $scope.province;}else{province = null;}
        if ($scope.zipCode){zipCode = $scope.province;}else{zipCode = null;}
        if ($scope.github){github = $scope.github;}else{github = null;}
        if ($scope.linkedin){linkedin = $scope.linkedin;}else{linkedin = null;}

        // build object after assigning all the values
        $scope.contacts.$add({
          name: name,
          email: email,
          company: company,
          phones: [{
            work: workPhone,
            mobile: mobilePhone,
            home: homePhone
          }],
          address:  [
            {
              streetAddress: streetAddress,
              city: city,
              province: province,
              zipCode: zipCode
            }
          ]  
        }).then(function(ref){
          var id = ref.key;   // firebase api changed, so it's not ref.key() nor reference.key() anymore, just ref.key (attribute instead of function)
          console.log('added contact with ID: ' + id);

          // clear the form after adding the contact
          clearFields();

          // hide form after submitting
          $scope.addFormShow = false;

          // send msg to user
          $scope.msg = "Contact Added";
      });
    }

    function clearFields(){
      console.log("Clearing fields...");
        $scope.name = "";
        $scope.email = "";
        $scope.company = "";
        $scope.workPhone = "";
        $scope.mobilePhone = "";
        $scope.homePhone = "";
        $scope.streetAddress = "";
        $scope.city = "";
        $scope.province = "";
        $scope.zipCode = "";
        $scope.github = "";
        $scope.linkedin = "";
    }
    
}]);