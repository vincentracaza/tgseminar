/**
 * Created by User-Hp002 on 6/13/13.
 */

///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />
///<reference path='../Service.ts' />


module Todo {
    export interface Scope extends ng.IScope {
        todos:Model.Todo[];

        add:()=>void;
        remove:(index)=>void;
        modify:(index, modifiedValue)=>void;
        newContent:string;
    }

    export class Controller {
        constructor(public $scope:Scope, public todoService:Service.TodoService) {
            this.$scope.todos = [
                new Model.Todo("Hello my todo.")
            ];

            this.$scope.add = () => this.add();
            this.$scope.remove = (index) => this.remove(index);
            this.$scope.modify = (index, modifiedValue) => this.modify(index, modifiedValue);

            this.todoService.getList()
                .success((todos:Model.Todo[]) => {
                    this.$scope.todos = todos;

                });
        }

        add():void {
            var content = this.$scope.newContent;
            var todo = new Model.Todo({title:content});
            this.$scope.todos.push(todo);
        }

        remove(index):void {
            this.$scope.todos.splice(index, 1);
        }

        modify(index,modifiedValue):void {
            this.$scope.todos[index] = new Model.Todo({title:modifiedValue});
        }
    }
}