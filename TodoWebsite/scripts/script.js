function callApi() {
    $.ajax({
        type: 'GET',
        //TODO: Swap url for relative url when hosted on same domain
        //url: '/api/TodoItems',
        url: 'https://localhost:44378/api/TodoItems',
        dataType: 'json',
        success: function (data) {
            alert('Success got hit.');
            window.console.log('Success: ' + JSON.stringify(data));
        },
        error: function (request, error) {
            alert('Error got hit.');
            window.console.log('Error Request: ' + JSON.stringify(request));
            window.console.log('Error: ' + error);
        }
    });
};

