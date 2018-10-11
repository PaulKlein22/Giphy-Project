$(document).ready(function() {

var topics = ["Cats", "Dogs", "Birds", "Pigs"];

    function displayAnimals() {

    var value = $(this).data("search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=6p1Ppoiyru68zQHyWhpwONr775A0TTYl&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        .done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
            var showDiv = $("<div class='col-md-4'>");
            var rating = results[i].rating;
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var showImage = $("<img>");
            var paragraph = $("<p>").text("Rating: " + rating);

            showImage.attr("src", staticSrc);
            showImage.addClass("animalGif");
            showImage.attr("data-state", "still");
            showImage.attr("data-still", staticSrc);
            showImage.attr("data-animate", defaultAnimatedSrc);
            showDiv.append(paragraph);
            showDiv.append(showImage);
            $("#gifArea").prepend(showDiv);
          }
        }
    });
}

    $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        var newanimal = $("#animalsearch").val().trim();
        topics.push(newanimal);
        console.log(topics);
        $("#animalsearch").val('');
        displayButtons();
        });

    function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $('<button class="btn btn-primary">');
        a.attr("id", "animal");
        a.attr("data-search", topics[i]);
        a.text(topics[i]);
        $("#myButtons").append(a);
      }
    }

    displayButtons();

    $(document).on("click", "#animal", displayAnimals);
    $(document).on("click", ".animalGif", animateGifs);

    function animateGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
    }
}
});