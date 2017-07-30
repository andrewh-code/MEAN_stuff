'use strict';


// Declare app level module which depends on views, and components
angular.module('contactList', [
  // dependencies
  'ngRoute',  
  'firebase',
  'contactList.contacts'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
