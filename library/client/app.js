var myApp = angular.module('myApp',['ngRoute']);	// initiates the module, call it myApp, ngRoute is from angular-route

// setup all of our routes
myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'BooksController',	// specificy which controller to use when user gets to '/' route
		templateUrl: 'views/books.html'
	})
	.when('/books', {
		controller:'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/books/details/:id',{
		controller:'BooksController',
		templateUrl: 'views/book_details.html'
	})
	.when('/books/add',{
		controller:'BooksController',
		templateUrl: 'views/add_book.html'
	})
	.when('/books/edit/:id',{
		controller:'BooksController',
		templateUrl: 'views/edit_book.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

myApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);