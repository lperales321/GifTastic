const topics = ["Pennywise", "Freddy Krueger", "Jason Voorhees", "Leatherface", "Ghostface", 
                "Michael Myers", "Hannibal Lecter", "Pinhead", "Norman Bates", "Chucky", 
                "Jack Torrance", "Carrie White", "Annie Wilkes", "Patrick Bateman", "Buffalo Bill", 
                "Captain Spaulding", "Candyman", "Dracula", "Regan", "Rosemary Woodhouse"];

for (let i = 0; i < topics.length; i++) {
    let personBtn = $("<button>");
    personBtn.attr("data-person", topics[i]);
    personBtn.text(topics[i]);

    $("#buttons").append(personBtn);
};

$('button').on("click", function() {
    event.preventDefault();

    let person = $(this).data("person");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let results = response.data;

        for (let i = 0; i < results.length; i++) {
            let gifDiv = $("<div>");

            let rating = results[i].rating;

            let p = $("<p>").text("Rating: " + rating);

            let personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.addClass("gif");

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);

            // $("#gifs-appear-here").prepend(p);
            // $("#gifs-appear-here").prepend(personImage);
        }
    }).catch(function(error) {
        console.log(error.code);
    });
});

$(".gif").on("click", function() {
    let state = $(this).attr("data-state");

    if(state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});