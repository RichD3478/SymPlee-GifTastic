var animalsArr = ["aardvark", "bear", "cat", "dog", "eagle", "fish", "goat", "horse", "iguana", "jackrabbit"];

function renderButtons() {
  $("#buttonPanel").empty();

  for (var i = 0; i < animalsArr.length; i++) {
    var button = $("<button>");
    button.addClass("animalButton");
    button.attr("data-animal", animalsArr[i]);
    button.text(animalsArr[i]);

    $("#buttonPanel").append(button);
  }
}

$("#add-animal").on("click", function (event) {
  event.preventDefault();
  var animal = $("#animal-input").val().trim();

  animalsArr.push(animal);
  $("#animal-input").val("");
  renderButtons();
});

function displayGiphyInfo() {

  var animalName = $(this).attr("data-name");
  var animalStr = animalName.split(" ").join("+");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4DdycvPFMSeDJGXNxeGZTyyWamWNbWg0&q=" + animal + "animal&limit=10&offset=0&rating&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function (response) {
    var dataArr = response.data;

    $("#gifPanel").empty;
    for (var i = 0; i < dataArr.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("animalGif");

      var newRating = $("<h1>").html("Rating: " + dataArr[i].rating);
      newDiv.append(newRating);

      var newImage = $("<img>");
      newImage.attr("src", dataArr[i].images.fixed_height_still.url);
      newImage.attr("data-still", dataArr[i].images.fixed_height_still.url);
      newImage.attr("data-animate", dataArr[i].images.fixed_height.url);
      newImage.attr("data-state", "still");
      newDiv.append(newImage);

      $("#gifPanel").append(newDiv);

    }
    console.log(response);
    console.log(queryUrl);
  });