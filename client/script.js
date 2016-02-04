var application = window.angular.module("application",["ngResource", "lbServices"]);
//Angular Application Controller
var controllerInjections = ["$scope", "Program", "Exercise"];
var controller = function($scope, Program, Exercise){
    //Load all programs
    $scope.load = function(){
      Program.find({},
        function(programs){
          //Add container for exercises to program locally
          programs.forEach(function(program){
            program.exercises = [];
          });
          $scope.programs = programs;
          if(!$scope.current) $scope.current = $scope.programs[0];
          $scope.fetchExercises();
        },
        function(error){
          //Display Error
          console.error(error);
          return window.alert('error fetching programs : ', error);
        });
    };
    //Create new program
    $scope.newProgram = function(){
      Program.create({name:$scope.pName, description:$scope.pDescription}, function(program){
        //Add container for exercises to program locally
        program.exercises = [];
        //Add new program to list of programs
        $scope.programs.push(program);
        //Set new program to current program.
        $scope.current = program;
        //Reset inputs
        $scope.pName = $scope.pDescription = '';
      },
      function(error){
        //Display error
        if(!$scope.pName) return alert('missing program name');
        if(!$scope.pDescription) return alert('missing program description');
        console.error(error);
      });
    };
    //Fetch exercises for current program
    $scope.fetchExercises = function(){
      if(!$scope.current) return false;
      Exercise.find({
        filter:{
          where: {
            programid : $scope.current.id
          }
        }
      },
      function(exercises){
        //Set Exercises
        $scope.current.exercises = exercises;
      },function(error){
        //Display Error
        console.error(error);
      });
    };
    //Create new exercise for current program
    $scope.newExercise = function(){
      if(!$scope.current) return false;
      Exercise.create({
        programid: $scope.current.id,
        name:$scope.eName,
        reps:$scope.eReps,
        sets:$scope.eSets,
        pace:$scope.ePace,
        weight:$scope.eWeight,
        duration:$scope.eDuration
      }, function(exercise){
        //Reset inputs
        //Display new exercise
        $scope.current.exercises.push(exercise);
        $scope.eName =
        $scope.eSets =
        $scope.eReps =
        $scope.ePace =
        $scope.eWeight =
        $scope.eDuration = '';
      },function(error){
        //Display error
        if(!$scope.eName) return alert('missing exercise name');
        console.error(error);
      });
    };

    //Initialize
    $scope.load();
}
controller.$inject = controllerInjections;
application.controller("controller", controller);
