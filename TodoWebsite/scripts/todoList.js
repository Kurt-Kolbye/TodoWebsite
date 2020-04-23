// Created todoListVM as a global variable to perform operations from console
var todoListVM;

$(document).ready(function() {
    function TodoListVM() {
        // Data
        var self = this;
        self.todoItems = ko.observableArray([]);
        self.newTodoText = ko.observable();
    
        // Operations
        self.addTodo = function() {
            
            var newTodo = new Todo({ 
                name: self.newTodoText(),
                isComplete: false
            });

            var newTodoJSON = ko.toJSON(newTodo);
            
            $.ajax({
                type: 'POST',
                //TODO: Swap url for relative url when hosted on same domain
                //url: '/api/TodoItems',
                url: 'https://localhost:44378/api/TodoItems',
                contentType: 'application/json',
                dataType: 'json',
                data: newTodoJSON,
                success: function (data) {
                    window.console.log('AJAX POST Success: ' + JSON.stringify(data));
                    // Set the id returned from the server
                    newTodo.id(data.id);
                    // Add new Todo to the list of items                    
                    self.todoItems.push(newTodo);
                    // Reset input
                    self.newTodoText("");
                },
                error: function (request, error) {
                    alert('Error got hit on POST.');
                    window.console.log('Error Request: ' + JSON.stringify(request));
                    window.console.log('Error: ' + error);
                }
            });
        };
        
        self.removeTodo = function(todoItem) {
            
            var deleteUrl = 'https://localhost:44378/api/TodoItems/' + todoItem.id();

            $.ajax({
                type: 'DELETE',
                //TODO: Swap url for relative url when hosted on same domain
                //url: '/api/TodoItems/{id}',
                url: deleteUrl,
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {
                    window.console.log('AJAX DELETE Success: ' + JSON.stringify(data));
                    self.todoItems.remove(todoItem);
                },
                error: function (request, error) {
                    alert('Error got hit on DELETE.');
                    window.console.log('Error Request: ' + JSON.stringify(request));
                    window.console.log('Error: ' + error);
                }
            });
        }

        self.updateTodo = function(todoItem) {
            var updateUrl = 'https://localhost:44378/api/TodoItems/' + todoItem.id();

            var updatedTodoJSON = ko.toJSON(todoItem);

            $.ajax({
                type: 'PUT',
                //TODO: Swap url for relative url when hosted on same domain
                //url: '/api/TodoItems/{id}',
                url: updateUrl,
                contentType: 'application/json',
                dataType: 'json',
                data: updatedTodoJSON,
                success: function () {
                    window.console.log('AJAX PUT Success!');
                },
                error: function (request, error) {
                    alert('Error got hit on PUT.');
                    window.console.log('Error Request: ' + JSON.stringify(request));
                    window.console.log('Error: ' + error);
                }
            });
        }

        // Load initial data from server
        $.ajax({
            type: 'GET',
            //TODO: Swap url for relative url when hosted on same domain
            //url: '/api/TodoItems',
            url: 'https://localhost:44378/api/TodoItems',
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                window.console.log('AJAX GET Success: ' + JSON.stringify(data));
                // Convert the data into Todo objects
                var mappedTodos = $.map(data, function(item) {
                    return new Todo(item);
                });
                // Add Todo objects to array
                self.todoItems(mappedTodos);
            },
            error: function (request, error) {
                alert('Error got hit on GET.');
                window.console.log('Error Request: ' + JSON.stringify(request));
                window.console.log('Error: ' + error);
            }
        });
    };
    todoListVM = new TodoListVM();
    ko.applyBindings(todoListVM);
});

// Todo Model
function Todo(data) {
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.isComplete = ko.observable(data.isComplete);
};