(function() {
  var app = angular.module( 'todoList', [ 'ngResource' ] );

  app.controller( 'todoListController', [function() {
    var self = this,
      dataToStore;

    self.newTask = {};

    if( localStorage.getItem( 'todoList' ) === null ) {
      self.listTasks = { "items": [] };
    } else {
      self.listTasks = JSON.parse(localStorage.getItem( 'todoList' ));
    } 

    self.addTask = function(){
      self.newTask.createdOn = self.newTask.createdOn || Date.now();
      self.newTask.status = self.newTask.status || 1;
      self.listTasks.items.push( self.newTask );
      self.newTask = {};
      self.storeData();
    };

    self.storeData = function() {
      dataToStore = JSON.stringify( self.listTasks );
      localStorage.setItem( 'todoList', dataToStore );
    }

    self.clearCompleted = function() {
      var tasks = self.listTasks.items, i;

      self.listTasks.items = tasks.filter(function(task){
        return task.status === 1;
      });
      self.storeData();
    };

    self.activeTasks = function() {
      var tasks = self.listTasks.items, i, 
        count = 0;

      for( i = 0; i < tasks.length; i++) {
        if( tasks[i].status === 1 ) {
          count++;
        }
      }
      return count;
    }

  }]);

  app.directive( 'todoForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/todo-form.html'
    }
  });

  app.directive( 'todoList', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/todo-list.html'
    }
  });

  app.directive( 'todoFilters', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/todo-filters.html'
    }
  });

  app.directive( 'todoCount', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/todo-count.html'
    }
  });

  app.directive( 'todoFooter', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/todo-footer.html'
    }
  });

})();
