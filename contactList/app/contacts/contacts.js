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
    var editContact;

    // show adding contacts form
    $scope.showAddForm = function(){
      $scope.addFormShow = true;    // the ng-show="addFormShow" tag in the contacts.html will be set to true and then show the form (must be on button-click though)
    }

    $scope.showEditForm = function(contact){
      $scope.editFormShow = true;
      
      editContact = contact;
      console.log(editContact);

      // show the current values on the form
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

    }

    $scope.hide = function(){
        $scope.addFormShow = false;
        $scope.contactShow = false;
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
          //clearFields();

          // hide form after submitting
          $scope.addFormShow = false;

          // send msg to user
          $scope.msg = "Contact Added";
      });
    }


    // edit contacts
    $scope.editFormSubmit = function(){
      console.log("hello from editFormSubmit");

      // storing everything as a firebase array instead of a firebase object (object has the $id)
      // get contact ID
      var id = editContact.$id;
     
      var record = $scope.contacts.$getRecord(id);
      var index = $scope.contacts.$indexFor(id);
      
      // console.log("temp contact is: " + "\n");
      //console.log(editContact);
      // console.log(editContact.name);
      // TODO: Figure out a way to pass in the $id of a contact from the array (firebase api dopucmentation out of date?)
      
      // assign updated values
      if (($scope.name) && ($scope.name != $scope.contacts[index].name)){
          $scope.contacts[index].name                     = $scope.name;
      }
      if (($scope.email) && ($scope.email != $scope.contacts[index].email)){
          $scope.contacts[index].email                    = $scope.email;
      }
      if (($scope.workPhone) && ($scope.workPhone != $scope.contacts[index].phones[0].work)){
          $scope.contacts[index].phones[0].work           = $scope.workPhone;
      }
      if (($scope.mobilePhone) && ($scope.mobilePhone != $scope.contacts[index].phones[0].mobile)){
        $scope.contacts[index].phones[0].mobile         = $scope.mobilePhone;
      }
      if (($scope.homePhone) && ($scope.homePhone != $scope.contacts[index].phones[0].home)){
        $scope.contacts[index].phones[0].home           = $scope.homePhone;
      }
      if (($scope.streetAddress) && ($scope.streetAddress != $scope.contacts[index].address[0].streetAddress)){
        $scope.contacts[index].address[0].streetAddress = $scope.streetAddress;
      }
      if (($scope.city) && ($scope.city != $scope.contacts[index].address[0].city)){
        $scope.contacts[index].address[0].city          = $scope.city;
      }
      if (($scope.province) && ($scope.province != $scope.contacts[index].address[0].province)){
        $scope.contacts[index].address[0].province      = $scope.province;
      }
      if (($scope.zipCode) && ($scope.zipCode != $scope.contacts[index].address[0].zipCode)){
        $scope.contacts[index].address[0].zipCode       = $scope.zipCode;
      }
      if (($scope.github) && ($scope.github != $scope.contacts[index].github)){
        $scope.contacts[index].github                   = $scope.github;
      }
      if (($scope.linkedin) && ($scope.linkedin != $scope.contacts[index].linkedin)){
        $scope.contacts[index].linkedin                 = $scope.linkedin;
      }

      // firebase will reject any update/put options if ANY of the variables are undefined/null (set them to " " if they are)
      $scope.contacts.$save(index)
        .then(function(ref){
          console.log("saving contact...");
      })
      .catch(function(error){
        console.log(error);
      })

      // clear the fields after updating the contact
      clearFields();

      // hide the edit contact form
      $scope.editFormShow = false;

      // {{msg}}
      $scope.msg = "Contact Updated";

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

    // delete contacts from firebase
    $scope.removeContact = function(contact){
        
        window.alert("delete functionality disabled for now");
        // $scope.contacts.$remove(contact)
        // .catch(function(error){
        //   console.log(error);
        // })

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