$(document).ready(function() {
    function TodoListVM() {
        // Data
        var self = this;
        self.todoItems = ko.observableArray([]);
    
        // Operations

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