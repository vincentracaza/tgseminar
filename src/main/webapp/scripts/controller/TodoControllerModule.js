var Todo;
(function (Todo) {
    var Controller = (function () {
        function Controller($scope) {
            this.$scope = $scope;
            var _this = this;
            this.$scope.todos = [
                new Model.Todo("Hello my todo."), 
                new Model.Todo("Hello my todo2.")
            ];
            this.$scope.add = function () {
                return _this.add();
            };
        }
        Controller.prototype.add = function () {
            var content = this.$scope.newContent;
            var todo = new Model.Todo(content);
            this.$scope.todos.push(todo);
        };
        return Controller;
    })();
    Todo.Controller = Controller;    
})(Todo || (Todo = {}));
