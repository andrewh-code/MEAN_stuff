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
					scope.name = q.name;
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
			name: "KAKUNA",
			options: ["Pokemon", "Technology"],
			answer: 0,
			reason: "Kakuna - #14: Is the second evolution of Weedle and evolves into Beedrill. Kakuna remains virtually immobile as it clings to a tree. However, on the inside, it is extremely busy as it prepares for its coming evolution. This is evident from how hot the shell becomes to the touch.",
			img: "img/pokemon/kakuna_014.png"
		},
		{
			name: "AVIATO",
			options: ["Pokemon", "Technology"],
			answer: 1,
			reason: "Aviato is a fictional technology company first seen on the TV show, Silicon Valley",
			img: "img/tech/Aviato.jpg"
		},
		{
			name: "TYPE: NULL ",
			options: ["Pokemon", "Technology"],
			answer: 0,
			reason: "Type: Null is actually both a technical term and a pokemon. Null is a data type in many programming languages and is something programmers need to watch out for when evaluating variables. It is also a Pokemon, #772. The heavy control mask Type: Null wears suppresses its intrinsic capabilities. This Pokémon has some hidden special power.",
			img: "img/pokemon/typenull_772.png"
		},
		{
			name: "HAXORUS",
			options: ["Pokemon", "Technology"],
			answer: 0,
			reason: "Haxorus is a Pokemon - #612. They are kind but can be relentless when defending territory. They challenge foes with tusks that can cut steel.",
			img: "img/pokemon/haxorus_612.png"
		},
		{	
			name: "CORDA",
			options: ["Pokemon", "Technology"],
			answer: 1,
			reason: "Corda is a technology related term. It is a distributed ledger technology (blockchain industry) created by the company R3",
			img: "img/tech/corda.png"
		},
		{
			name: "KORORA",
			options: ["Pokemon", "Technology"],
			answer: 1,
			reason: "Is type of Fedora Linux Operating System.  Originally Kororaa was a binary installation method for Gentoo Linux which aimed for easy installation of a Gentoo system by using install scripts instead of manual configuration. The name derives from the Māori word, “kororā” – the little penguin. For more information: https://en.wikipedia.org/wiki/Korora_(operating_system)",
			img: "img/tech/korora.png"
		},
		{
			name: "WIMPOD",
			options: ["Pokemon", "Technology"],
			answer: 0,
			reason: "Wimpod - #767: This Pokémon is a coward. As it desperately dashes off, the flailing of its many legs leaves a sparkling clean path in its wake.",
			img: "img/pokemon/wimpod_767.png"
		},
		{
			name: "ACCUMULO",
			options: ["Pokemon", "Technology"],
			answer: 1,
			reason: "Apache Accumulo is a computer software project that developed a sorted, distributed key/value store based on the Bigtable technology from Google. It is a system built on top of Apache Hadoop, Apache ZooKeeper, and Apache Thrift. Written in Java, Accumulo has cell-level access labels and server-side programming mechanisms. Accumulo is the third most popular NoSQL wide column store according to the DB-Engines ranking, behind Apache Cassandra and Hbase as of 2015. For more information: https://en.wikipedia.org/wiki/Apache_Accumulo",
			img: "img/tech/accumulo.png"
		},
		{
			name: "SNOBOL",
			options: ["Pokemon", "Technology"],
			answer: 1,
			reason: "SNOBOL (StriNg Oriented and symBOlic Language) is a series of computer programming languages developed between 1962 and 1967 at AT&T Bell Laboratories by David J. Farber, Ralph E. Griswold and Ivan P. Polonsky, culminating in SNOBOL4. It was one of a number of text-string-oriented languages developed during the 1950s and 1960s; others included COMIT and TRAC. For more information: https://en.wikipedia.org/wiki/SNOBOL",
			img: ""
		}
	];

/*
{
	name: "",
	options: ["Pokemon", "Technology"],
	answer: ,
	reason: "",
	img: ""
},
*/
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