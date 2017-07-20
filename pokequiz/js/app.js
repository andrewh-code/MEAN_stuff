var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.reason = q.reason;
					scope.img = q.img;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "Is KAKUNA a Pokemon or technoloyg related term",
			options: ["Pokemon", "Technology"],
			answer: 0,
			reason: "Kakuna - #14: Is the second evolution of Weedle and evolves into Beedrill. Kakuna remains virtually immobile as it clings to a tree. However, on the inside, it is extremely busy as it prepares for its coming evolution. This is evident from how hot the shell becomes to the touch.",
			img: "img/pokemon/kakuna_014.png"
		},
		{
			question: "Is AVIATO a Pokemon or technology related term",
			options: ["Pokemon", "Technology"],
			answer: 1,
			reason: "Aviato is a fictional technology company first seen on the TV show, Silicon Valley",
			img: "img/tech/Aviato.jpg"
		},
		{
			question: "Is TYPE: NULL a Pokemon or technology related term",
			options: ["Pokemon", "Technology"],
			answer: 0,
			reason: "Type: Null is actually both a technical term and a pokemon. Null is a data type in many programming languages and is something programmers need to watch out for when evaluating variables. It is also a Pokemon, #772. The heavy control mask Type: Null wears suppresses its intrinsic capabilities. This Pokémon has some hidden special power.",
			img: "img/pokemon/typenull_772.png"
		},
		{
			question: "Is HAXORUS a Pokemon or technoloyg related term",
			options: ["Pokemon", "Technology"],
			answer: 0,
			reason: "Haxorus is a Pokemon - #612. They are kind but can be relentless when defending territory. They challenge foes with tusks that can cut steel.",
			img: "img/pokemon/haxorus_612.png"
		},
		{	
			question: "Is CORDA a Pokemon or technology related term",
			options: ["Pokemon", "Technology"],
			answer: 1,
			reason: "Corda is a technology related term. It is a distributed ledger technology (blockchain industry) created by the company R3",
			img: "img/tech/corda.png"
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});