var myApp = angular.module('myApp');

// $scope allows data to be passed between the view and controller (two way data binding)
        // $http module --> allow us to make get/post requests 
        // $location --> redirection
        // th is works as long as you don't use the minified version of angular 
        // to avoid this from breaking, specify the variables in the params (before function)

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    
    console.log('BooksController loaded...');

    // update to angular is messed 
    $scope.getBooks = function(){
        console.log("getBooks function loaded...");
        $http.get('/api/books').then(function(response){    //access the backend api url
            $scope.books = response.data;    //allows us to access the books inside of our template
            //console.log($scope.books[1].title);
            
        }, function(response){
            $scope.books = 404;    // change this
        });    
    }

    $scope.getIndividualBook = function(){
        var id = $routeParams.id;
        console.log("getIndividualBook loaded..");
        $http.get('/api/books/'+id).then(function(response){    //access the backend api url
            $scope.book = response.data;    //allows us to access the books inside of our template
            console.log($scope.book.title);
            
        }, function(response){
            $scope.books = 404;    // change this
        });    
    }

    $scope.addBook = function(){
        console.log("addBook loaded...");
        $http.post('/api/books/', $scope.book).then(function(response){
            $scope.book = response;
            window.location.href='#/books';
        }, function(response){
            $scope.books = 404;
        });
    }

    $scope.deleteBook = function(id){
        console.log("delete book loaded...");
        $http.delete('/api/books/'+id).then(function(response){
            window.location.href='#/books';
        
        }, function(response){
            $scope.books = 404;
        });
    }

}]);   