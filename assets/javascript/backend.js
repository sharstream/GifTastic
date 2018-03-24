$(document).ready(function () {
    // debugger
    var animals = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 'sugar glider',
                    'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat', 'checken', 'capybara', 'teacup pig',
                    'serval', 'salamander', 'frog'];

    var my_api_key = "dc6zaTOxFJmzC";

    var animal = "";

    var query_url = "";

    var labelID;
    // Function for displaying movie data
    function renderButtons() {
        // debugger
        function createRadioElement(label) {
            var replaceLabel = label.replace(/\ /g, '_');
            var id = replaceLabel;
            $('#animal-buttons').append($('<button />', {
                'class': id + ' btn btn-success',
                'id': 'submitAnimal',
                'data-animal': replaceLabel,
                'type': 'button',
                'name': 'name'
            })).css({'margin-left':'2%'});

            $('.' + replaceLabel).append('<label for="' + id + '">'
                + label + '</label>');

            // $('.button').text("dog");
        } 

        $('#animal-buttons').empty();
        // $('#movies-view').children().remove();
        animals.forEach(function (animal) {
            // debugger
            createRadioElement(animal);
        })
    }

    $("#clearResults").on("click", function () {
        console.log("clicked");
        renderButtons();
    });

    $('#submitResult').on('click', function(){
        // debugger
        // event.preventDefault();

        animal = $('.animal_search_input').val();

        animals.push(animal);

        console.log(animals);

        renderButtons();
    })
    
    $(".gif").on("click", function () {
        debugger
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("label").click(function(){
        // debugger
        var inputID = $(this).find("label").attr("for");
        $('#' + inputID).click();

        $("#animals").children('.col-md-3').remove();
        ajaxCall(query_url);
    });

    $("button, input[type='button']").on('click', function (event) {
        // debugger
        event.preventDefault();
        $("#animals").children('.col-md-3').remove();
        var animal = $('.animal_search_input').val().trim();

        var url = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";;

        query_url = url;

        ajaxCall(query_url);
    });

    function ajaxCall(queryAnimal){
        // debugger
        $.ajax({
            url: queryAnimal,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            xhr: function (data, status) {

                var xhr = new window.XMLHttpRequest();

                xhr.addEventListener("error", function (evt) {
                    alert("an error occured");
                }, false);

                xhr.addEventListener("abort", function () {
                    alert("cancelled");
                }, false);

                console.log(xhr);

                return xhr;
            },
            error: function (err) {
                console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
            }

        }).then(function (response) {

            var results = response.data;
            
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>").addClass('col-md-3');
                
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", (results[i].images.fixed_height.url).replace(/\?.*/, ''));
                animalImage.attr("data-still", (results[i].images.fixed_height.url).replace(/\/200?.*/, '/200_s.gif'));
                animalImage.attr("data-animate", (results[i].images.fixed_height.url).replace(/\?.*/, ''));
                animalImage.attr("data-state", "animate");
                animalImage.attr("class", "gif");
                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#animals").prepend(animalDiv);
            }
        }).done(function(){
            console.log("success");

        }).fail(function(){
            console.log("error");
            
        }).always(function(){
            console.log("complete");
        });
    };

    renderButtons();
});