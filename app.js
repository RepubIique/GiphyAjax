function displayGif(gifValue) {
  const queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gifValue +
    "&api_key=ymgJ9T8kvn9rn6ROl4TCPEyUMUafjrrh&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    if (response.pagination.count === 0) {
      $("#gif-view").append("");
      const gifIndex = gifs.indexOf(gifValue);
      gifs = [
        ...gifs.slice(0, gifIndex),
        ...gifs.slice(gifIndex + 1, gifs.length)
      ];
      renderButtons();
    } else {
      for (let i = 0; i < 9; i++) {
        $("#gif-view").prepend(
          '<div class="card mx-4 my-3" style="width: 13rem;">' +
            '<div class="card-header">' +
            "Title: " +
            response.data[i].title +
            "</div>" +
            "<img src=" +
            response.data[i].images.fixed_width.url +
            'class="card-img-top">' +
            '<div class="card-body">' +
            '<p class="card-text">' +
            "Source: " +
            response.data[i].url +
            "</p></div></div>"
        );
      }
    }
  });
}

let gifs = ["Ernie & Burt", "Matrix", "Pulp Fiction", "The Lion King"];

function renderButtons() {
  $("#buttons-view").html("");
  for (let i = 0; i < gifs.length; i++) {
    const button = $("<button>");
    button.text(gifs[i]);
    button.addClass("btn btn-warning btn-outline-dark");
    button.css("margin", "3px");
    button.attr("type", "button");
    button.on("click", function(event) {
      displayGif(gifs[i]);
    });
    $("#buttons-view").append(button);
  }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();

  let gifTitle = $("#gif-input").val();

  if (!gifs.includes(gifTitle)) gifs.push(gifTitle);

  renderButtons();
});

renderButtons();
