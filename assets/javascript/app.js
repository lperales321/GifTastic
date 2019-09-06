const topics = ["Pennywise", "Freddy Krueger", "Jason Voorhees", "Leatherface", "Ghostface", 
                "Michael Myers", "Hannibal Lecter", "Pinhead", "Norman Bates", "Chucky", 
                "Jack Torrance", "Carrie White", "Annie Wilkes", "Patrick Bateman", "Buffalo Bill", 
                "Captain Spaulding", "Candyman", "Dracula", "Regan", "Rosemary Woodhouse"];

// Function for displaying topic buttons
function renderButtons() {

    // Looping through the array of movies
    for (let i = 0; i < topics.length; i++) {
        let personBtn = $("<button>");
        personBtn.attr("data-person", topics[i]);
        personBtn.text(topics[i]);
        personBtn.addClass("gifBtn")
    
        $("#buttons").append(personBtn);
    };

    $(".gifBtn").on("click", function(event) {
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
                personImage.addClass("gifImage");
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-state", "still");
    
                gifDiv.prepend(p);
                gifDiv.prepend(personImage);
    
                $("#gifs-appear-here").prepend(gifDiv);
            }
        }).catch(function(error) {
            console.log(error.code);
        });
    });

    $(".gifImage").on("click", function(event) {
        event.preventDefault();
    
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

    // This function handles events where submit button is clicked
    $("#add-topic").on("click", function(event) {
        event.preventDefault();

        // Delete the buttons prior to adding new topics
        $("#buttons").empty();

        // This line grabs the input from the textbox
        let character = $("#topic-input").val().trim();

        // The character from the textbox is then added to the array
        topics.push(character);

        // Calling renderButtons which handles the processing of the topic array
        renderButtons();

        $("#topic-input").val("");
    });
}


//Calling the renderButtons function to display the intial buttons
renderButtons();