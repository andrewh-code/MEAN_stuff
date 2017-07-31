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

    console.log($scope.contacts);

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

        if ($scope.name){name = $scope.name;}else{name = "";}
        if ($scope.email){email = $scope.email;}else{email = "";}
        if ($scope.company){company = $scope.company;}else{company = "";}
        if ($scope.workPhone){workPhone = $scope.workPhone;}else{workPhone = "";}
        if ($scope.mobilePhone){mobilePhone = $scope.mobilePhone;}else{mobilePhone = "";}
        if ($scope.homePhone){homePhone = $scope.homePhone;}else{homePhone = "";}
        if ($scope.streetAddress){streetAddress = $scope.streetAddress;}else{streetAddress = "";}
        if ($scope.city){city = $scope.city;}else{city = "";}
        if ($scope.province){province = $scope.province;}else{province = "";}
        if ($scope.zipCode){zipCode = $scope.province;}else{zipCode = "";}
        if ($scope.github){github = $scope.github;}else{github = "";}
        if ($scope.linkedin){linkedin = $scope.linkedin;}else{linkedin = "";}

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

    // function to show the contact form in the view
    $scope.showContact = function(contact){
      console.log("hello from showContact: " + contact.phones);

        $scope.name         = contact.name;
        $scope.email        = contact.email;
        $scope.company      = contact.company;
        $scope.workPhone    = contact.phones[0].work;
        $scope.mobilePhone  = contact.phones[0].mobile;
        $scope.homePhone    = contact.phones[0].home;
        $scope.streetAddress = contact.address[0].streetAddress;
        $scope.city         = contact.address[0].city;
        $scope.province     = contact.address[0].province;
        $scope.zipCode      = contact.address[0].zipCode;
        $scope.github       = contact.github;
        $scope.linkedin   = contact.linkedin;

        $scope.contactShow = true;
    }

    function clearFields(){
      console.log("Clearing fields...");
        $scope.name           = "";
        $scope.email          = "";
        $scope.company        = "";
        $scope.workPhone      = "";
        $scope.mobilePhone    = "";
        $scope.homePhone      = "";
        $scope.streetAddress  = "";
        $scope.city           = "";
        $scope.province       = "";
        $scope.zipCode        = "";
        $scope.github         = "";
        $scope.linkedin       = "";
    }
    
}]);