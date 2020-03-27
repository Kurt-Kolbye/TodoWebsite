$(document).ready(function() {
    function TodoListVM() {
        // Data
        var self = this;
        self.todoItems = ko.observableArray([]);
        self.newTodoText = ko.observable();
    
        // Operations
        self.addTodo = function() {
            
            var newTodo = new Todo({ 
                name: this.newTodoText(),
                isComplete: false
            });

            // Add new Todo to the list of items
            self.todoItems.push(newTodo);

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
                },
                error: function (request, error) {
                    debugger;
                    alert('Error got hit on POST.');
                    window.console.log('Error Request: ' + JSON.stringify(request));
                    window.console.log('Error: ' + error);
                }
            });
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
    ko.applyBindings(new TodoListVM());
});

// Todo Model
function Todo(data) {
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.isComplete = ko.observable(data.isComplete);
};