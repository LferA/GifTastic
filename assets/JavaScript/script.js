//Setting up API variables
  var q = "hmm";
  var limit = 10;
  var ButtonArray = ["Pikachu", "Charmander", "Squirtle", "Bulbasaur", "Treecko", "Mudkip", "Torchic", "Totodile", "Cyndaquil", "Chikorita"];

  function addToArray(){
    if(!$("#userInput").val() == ""){
    ButtonArray.push($("#userInput").val().trim());
    $("#userInput").val("");
    } else {
      alert("Invalid input");
    }
  }

  function cycleArray(){
    $("#buttons").empty();
    for (var i=0; i < ButtonArray.length; i++){
      createButton(ButtonArray[i]);
    }
  }

  function createButton(btnName){
     var button = $("<button>").text(btnName);
     button.attr("class", "giphyButton btn btn-sm");
     $("#buttons").append(button);
  }

  function createQuery(btnName){
    var APIkey = "sjSkM76b2OiPmLK990tnD8cPpuJzqYLx"
    var query = btnName 
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q="+ query +"&limit=10&offset=0&rating=R&lang=en"
    console.log("QueryURL is displayed below:");
    console.log(queryURL);
  }

    function mkImage(imageSrc, stillURL, animateURL, imgRating){
      var createdRating = $("<p>").text("Rating: " + imgRating.toUpperCase()).attr("class", "rating");
      $("#images").append(createdRating);
      var createdImage = $("<img>");
      createdImage.attr({
        "src": imageSrc,
        "class": "gif",
        "data-status": "still",
        "url-still": stillURL,
        "url-animate": animateURL
      });
      $("#images").append(createdImage);
    }

//Running External Array to populate with buttons
cycleArray();
//Button on click events below
$("#userSubmit").on("click", function(event){
  event.preventDefault();
  addToArray();
  cycleArray();
});


$("#buttons").on("click", "button.giphyButton", function(event) {
  event.preventDefault();
  $("#images").empty();
  console.log("Button value logged below:")
  console.log($(this).text());
  var btnName = ($(this).text());
  createQuery(btnName);
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      var gifArray = response.data;
      for(i=0; i < gifArray.length; i++){
          var imageSrc = gifArray[i].images.downsized_still.url;
          console.log(imageSrc);
          var stillURL = gifArray[i].images.downsized_still.url;
          console.log(stillURL);
          var animateURL = gifArray[i].images.downsized.url;
          console.log(animateURL);
          var imgRating = gifArray[i].rating;
          mkImage(imageSrc, stillURL, animateURL, imgRating);
        };
    });
});

$("#images").on("click", "img.gif", function(){
  var state = $(this).attr("data-status");
  if (state === "still"){
    $(this).attr("src", $(this).attr("url-animate"));
    $(this).attr("data-status", "animate")
  } else {
    $(this).attr("src", $(this).attr("url-still"));
    $(this).attr("data-status", "still");
  }
})

