let actors = [
  "Angelina Jolie",
  "Tom Cruise",
  "Jennifer Anniston",
  "Bred Pitt",
  "Mila Kunis",
  "Johnny Depp"
];
let displayBtn = $("#buttons");

// Function for displaying movie data
function renderButtons() {
  $("#buttons").empty();
  for (let i = 0; i < actors.length; i++) {
    let actorBtn = $("<button>").attr("class", "btn btn-dark");
    actorBtn.text(actors[i]);
    displayBtn.append(actorBtn);
  }
}

// This function handles events where one button is clicked
$("#submit").on("click", function() {
  event.preventDefault();
  let newActor;
  newActor = $("#actor-input").val();
  console.log(newActor);
  actors.push(newActor);
  console.log(newActor);
  renderButtons();
});

renderButtons();

$("button").on("click", function() {
  $("#result").html("");
  let actor = $(this).text();
  console.log("actor", actor);
  let queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    actor +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let results = response.data;
    for (let i = 0; i < results.length; i++) {
      let imgURL = results[i].images.fixed_height.url;
      let imgRating = $("<p>").text("Rating: " + results[i].rating);
      let imgElement = $("<img>");
      let imgDiv = $("<div>");

      imgElement.attr("src", imgURL);
      imgDiv.append(imgElement);
      imgDiv.append(imgRating);
      $("#gifs-appear-here").append(imgElement, imgRating);
    }
  });
});

// Calling the renderButtons function to display the initial list of movies

// let movieOutput = document.getElementById("movie-view");
// $("#find-movie").on("click", function(event) {
//   event.preventDefault();

//   let movie = $("#movie-input").val();
//   let queryURL =
//     "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
//   console.log(queryURL);
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     let title = document.createElement("h1");
//     let img = document.createElement("img");
//     let plot = document.createElement("p");
//     title.innerHTML = response.Title;
//     console.log(img);
//     img.src = response.Poster;
//     plot.innerHTML = response.Plot;
//     movieOutput.append(title, img, plot);
//     console.log(response);
//   });
// });
