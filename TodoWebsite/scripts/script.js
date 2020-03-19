$(document).ready(function() {
    function TodoListVM() {
        // Data
        var self = this;
        self.todoItems = ko.observableArray([]);
        self.newTodoText = ko.observable();
    
        // Operations
        self.addTodo = function() {
            self.todoItems.push(new Todo({ name: this.newTodoText() }));
            // TODO: Make a POST to the server to add the To do
            // Q: Post entire todoItems JSON or just the one? Probably just the one
        };
        self.removeTodo = function(todoItem) {
            self.todoItems.remove(todoItem);
            // TODO: Make a DELETE to the server to remove the To do
        }

        // Load initial data from server
        $.ajax({
            type: 'GET',
            //TODO: Swap url for relative url when hosted on same domain
            //url: '/api/TodoItems',
            url: 'https://localhost:44378/api/TodoItems',
            dataType: 'json',
            success: function (data) {
                window.console.log('AJAX Success: ' + JSON.stringify(data));
                // Convert the data into Todo objects
                var mappedTodos = $.map(data, function(item) {
                    return new Todo(item);
                });
                // Add Todo objects to array
                self.todoItems(mappedTodos);
            },
            error: function (request, error) {
                alert('Error got hit.');
                window.console.log('Error Request: ' + JSON.stringify(request));
                window.console.log('Error: ' + error);
            }
        });
    };
    ko.applyBindings(new TodoListVM());
});

// Todo Model
function Todo(data) {
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.isComplete = ko.observable(data.isComplete);
};