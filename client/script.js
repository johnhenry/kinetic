var application = window.angular.module("application",["ngResource", "lbServices"]);
//Angular Application Controller
var controllerInjections = ["$scope", "Program", "Exercise"];
var controller = function($scope, Program, Exercise){
    //Add New Program
    $scope.newProgram = function(){
      Program.create({name:$scope.pName, description:$scope.pDescription}, function(program){
        program.exercises = [];
        $scope.programs.push(program)
        $scope.current = program;
        $scope.pName = $scope.pDescription = '';
        //$scope.$apply();
      },function(error){
        if(!$scope.pName) return alert('missing program name');
        if(!$scope.pDescription) return alert('missing program description');

        console.error(error);
      });
    }
    //Add New Exercise
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
        $scope.current.exercises.push(exercise);
        //Reset inputs
        $scope.eName =
        $scope.eSets =
        $scope.eReps =
        $scope.ePace =
        $scope.eWeight =
        $scope.eDuration = '';
        //$scope.$apply();
      },function(error){
        if(!$scope.eName) return alert('missing exercise name');
        console.error(error);
      });
    }
    //Initialize
    var initialize = function(){
      $scope.current = $scope.programs[0];
      //$scope.$apply();
    }


    $scope.fetchExercises = function(){
      if(!$scope.current) return false;
      Exercise.find({
              filter:{where: { programid : $scope.current.id}}
            }, function(exercises){
              console.log($scope.current.id, exercises)
        $scope.current.exercises = exercises;
      },function(error){
        console.error(error);
      })
    }
    Program.find(
      {
        filter: { limit: 10 }
      },
      function(programs){
        programs.forEach(function(program){
          program.exercises = [];
        })
        $scope.programs = programs;
        $scope.current = $scope.programs[0];
        $scope.fetchExercises();
      },
      function(error){
        console.error(error);
        return window.alert('error fetching programs : ', error);
      })
}
controller.$inject = controllerInjections;
application.controller("controller", controller);
