$(document).ready(function(){   
    var my_api_key = "ad4988018f54406eb8c6e276f88f074e";
    var query_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    var user_input = "";

    $('.get_related_articles').click(function () {
        user_input = $('.article_search_input').val().replace(/\ /g, '+');
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        query_url = query_url + user_input + "&page=1&sort=oldest&api-key=" + my_api_key;
        url += '?' + $.param({
            'api-key': "ad4988018f54406eb8c6e276f88f074e",
            'q': user_input
        });
        // debugger
        $.ajax({
            url: url,
            type: 'GET',
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.addEventListener("error", function (evt) {
                    alert("an error occured");
                }, false);
                xhr.addEventListener("abort", function () {
                    alert("cancelled");
                }, false);

                return xhr;
            },
            error: function (err) {
                console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
            }
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.response.docs.length; i++) {
                console.log(response.response.docs[i].headline.main);
            }
        });
    });
});