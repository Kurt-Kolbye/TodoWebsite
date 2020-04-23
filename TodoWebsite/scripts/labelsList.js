// Created labelsListVM as a global variable to perform operations from console
var labelsListVM;

$(document).ready(function() {
    function LabelsListVM() {
        // Data
        var self = this;
        self.labels = ko.observableArray([]);
        self.newLabelText = ko.observable();
    
        // Operations
        self.addLabel = function() {
            
            var newLabel = new Label({ 
                name: self.newLabelText()
            });

            var newLabelJSON = ko.toJSON(newLabel);
            
            $.ajax({
                type: 'POST',
                //TODO: Swap url for relative url when hosted on same domain
                //url: '/api/Labels',
                url: 'https://localhost:44378/api/Labels',
                contentType: 'application/json',
                dataType: 'json',
                data: newLabelJSON,
                success: function (data) {
                    window.console.log('AJAX POST Success: ' + JSON.stringify(data));
                    // Set the id returned from the server
                    newLabel.id(data.id);
                    // Add new Label to the list of items                    
                    self.labels.push(newLabel);
                    // Reset input
                    self.newLabelText("");
                },
                error: function (request, error) {
                    alert('Error got hit on POST.');
                    window.console.log('Error Request: ' + JSON.stringify(request));
                    window.console.log('Error: ' + error);
                }
            });
        };

        self.removeLabel = function(label) {
            
            var deleteUrl = 'https://localhost:44378/api/Labels/' + label.id();

            $.ajax({
                type: 'DELETE',
                //TODO: Swap url for relative url when hosted on same domain
                //url: '/api/Labels/{id}',
                url: deleteUrl,
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {
                    window.console.log('AJAX DELETE Success: ' + JSON.stringify(data));
                    self.labels.remove(label);
                },
                error: function (request, error) {
                    alert('Error got hit on DELETE.');
                    window.console.log('Error Request: ' + JSON.stringify(request));
                    window.console.log('Error: ' + error);
                }
            });
        }

        self.updateLabel = function(label) {
            var updateUrl = 'https://localhost:44378/api/Labels/' + label.id();

            var updatedLabelJSON = ko.toJSON(label);

            $.ajax({
                type: 'PUT',
                //TODO: Swap url for relative url when hosted on same domain
                //url: '/api/Labels/{id}',
                url: updateUrl,
                contentType: 'application/json',
                dataType: 'json',
                data: updatedLabelJSON,
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
            //url: '/api/Labels',
            url: 'https://localhost:44378/api/Labels',
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                window.console.log('AJAX GET Success: ' + JSON.stringify(data));
                // Convert the data into Label objects
                var mappedLabels = $.map(data, function(item) {
                    return new Label(item);
                });
                // Add Label objects to array
                self.labels(mappedLabels);
            },
            error: function (request, error) {
                alert('Error got hit on GET.');
                window.console.log('Error Request: ' + JSON.stringify(request));
                window.console.log('Error: ' + error);
            }
        });
    };
    labelsListVM = new LabelsListVM();
    ko.applyBindings(labelsListVM);
});

// Label Model
function Label(data) {
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
};