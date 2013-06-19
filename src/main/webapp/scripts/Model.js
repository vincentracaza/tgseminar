var Model;
(function (Model) {
    var Sample = (function () {
        function Sample(data) {
            if(angular.isString(data)) {
                data = angular.fromJson(data);
            }
            this.test = data.test;
        }
        return Sample;
    })();
    Model.Sample = Sample;    
    var Todo = (function () {
        function Todo(data) {
            this.id = data.id;
            this.title = data.title;
            this.createdAt = data.createdAt;
            this.createdBy = data.createdBy;
        }
        return Todo;
    })();
    Model.Todo = Todo;    
})(Model || (Model = {}));
