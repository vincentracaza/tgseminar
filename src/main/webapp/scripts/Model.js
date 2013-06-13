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
        function Todo(content) {
            if (typeof content === "undefined") { content = "Unknown"; }
            this.content = content;
        }
        return Todo;
    })();
    Model.Todo = Todo;    
})(Model || (Model = {}));
