//mi key: 8mKG8QmFdsKwol0bQMVBJfYntusORxLG
$(document).ready(function() {

    var temas = ["MiniPig", "Ostrich", "Puppy", "Rat", "Mouse", "Capybara", "Quoka", "Koala", "Corgi", "Horse", "Otter", "Chipmunk"];

    for (var i = 0; i < temas.length; i++) {
        $("#animal-buttons").append(`<input type="submit" id="animalButton" value="${temas[i]}">`);
    }

    $("#animal-buttons").on("click", "#animalButton", function() { 

        var animals = $("[name=imagen]");
        var l = animals.length;
        for (var i = 0; i < l; i++) {
            animals[i].remove();
        }

        var request =  {
            url: `http://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=8mKG8QmFdsKwol0bQMVBJfYntusORxLG&limit=10`,
            success: function(respuesta) {
                for (var i = 0; i < respuesta.data.length; i++) {

                    var imagen = $(`<img alt="un gif de un ${this.value}" name="imagen">`);
                    imagen.attr("src", respuesta.data[i].images.fixed_height_still.url);
                    imagen.attr("data-still", respuesta.data[i].images.fixed_height_still.url); 
                    imagen.attr("data-gif", respuesta.data[i].images.fixed_height.url);
                    imagen.attr("data-state", "still");
                    imagen.addClass("animal-item");

                    $("#animals").append(imagen);
                }
            },
            error: function() {
                console.log("No se ha podido obtener la información");
            },
        }
        
        $.ajax(request);
    })

    $("body").on("click", ".animal-item", function(e) {
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-gif"));
            $(this).attr("data-state", "moving");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    $("#add-animal").on("click", function(e) {
        e.preventDefault();
        var name = $("#animal-input").val();
        $("#animal-buttons").append(`<input type="submit" id="animalButton" value="${name}">`);
    })
});
