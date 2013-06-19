var Todo;
(function (Todo) {
    var Controller = (function () {
        function Controller($scope, todoService) {
            this.$scope = $scope;
            this.todoService = todoService;
            var _this = this;
            this.$scope.todos = [
                new Model.Todo("Hello my todo.")
            ];
            this.$scope.add = function () {
                return _this.add();
            };
            this.$scope.remove = function (index, id) {
                return _this.remove(index, id);
            };
            this.$scope.modify = function (index, modifiedValue, id) {
                return _this.modify(index, modifiedValue, id);
            };
            this.todoService.getList().success(function (todos) {
                _this.$scope.todos = todos;
            });
        }
        Controller.prototype.add = function () {
            var content = this.$scope.newContent;
            var todo = new Model.Todo({
                title: content
            });
            this.$scope.todos.push(todo);
            this.todoService.add(content);
        };
        Controller.prototype.remove = function (index, id) {
            this.$scope.todos.splice(index, 1);
            this.todoService.delete(id);
        };
        Controller.prototype.modify = function (index, modifiedValue, id) {
            this.$scope.todos[index] = new Model.Todo({
                title: modifiedValue
            });
            this.todoService.edit(id, modifiedValue);
        };
        return Controller;
    })();
    Todo.Controller = Controller;    
})(Todo || (Todo = {}));
