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
        remove:(index, id)=>void;
        modify:(index, modifiedValue, id)=>void;
        newContent:string;
    }

    export class Controller {
        constructor(public $scope:Scope, public todoService:Service.TodoService) {
            this.$scope.todos = [
                new Model.Todo("Hello my todo.")
            ];

            this.$scope.add = () => this.add();
            this.$scope.remove = (index, id) => this.remove(index, id);
            this.$scope.modify = (index, modifiedValue, id) => this.modify(index, modifiedValue, id);

            this.todoService.getList()
                .success((todos:Model.Todo[]) => {
                    this.$scope.todos = todos;

                });
        }

        add():void {
            var content = this.$scope.newContent;
            var todo = new Model.Todo({title:content});
            this.$scope.todos.push(todo);

            this.todoService.add(content);
        }

        remove(index, id):void {
            this.$scope.todos.splice(index, 1);
            this.todoService.delete(id);
        }

        modify(index,modifiedValue, id):void {
            this.$scope.todos[index] = new Model.Todo({title:modifiedValue});
            this.todoService.edit(id, modifiedValue);
        }
    }
}