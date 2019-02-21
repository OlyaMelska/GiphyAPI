let actors = [
  "Angelina Jolie",
  "Tom Cruise",
  "Jennifer Anniston",
  "Bred Pitt",
  "Mila Kunis",
  "Johnny Depp",
  "Bradley Cooper"
];
let displayBtn = $("#buttons");

function renderButtons() {
  $("#buttons").empty();
  for (let i = 0; i < actors.length; i++) {
    let actorBtn = $("<button>")
      .attr("class", "btn btn-dark")
      .attr("actor", actors[i]);
    actorBtn.text(actors[i]);
    displayBtn.append(actorBtn);
  }
}

$("#submit").on("click", function() {
  event.preventDefault();
  let newActor;
  newActor = $("#actor-input").val();
  actors.push(newActor);
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
    let results = response.data;
    for (let i = 0; i < results.length; i++) {
      let imgURL = results[i].images.fixed_width_still.url;
      let imgRating = $("<p>")
        .text("Rating: " + results[i].rating)
        .attr("class", "card-title");
      let imgElement = $("<img>");
      let cardDiv = $("<div>").attr("class", "card");

      imgElement.attr("src", imgURL).attr("class", "card-img-top");
      cardDiv.append(imgElement, imgRating);
      $("#result").append(cardDiv);
      $("img").on("click", event => {
        let newImgURL = results[i].images.fixed_height.url;
        console.log("new url " + newImgURL);
        let clickedImg = $(event.target);
        console.log("clicked img " + clickedImg);
        clickedImg.attr("src", newImgURL);
      });
    }
  });
});
