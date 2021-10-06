
//yelp API    https://api.yelp.com/v3
getIP();
const apiKey = 'XuUUt7lnbYUG63HR5z0Su4ocNLuloHrt9lCfUn5UHT1vnKmSaYvi_IHTHfaUUHkVwkkxquBgDxLXFz3MX-PnVo2wxlnyLuoRy6v6a5quYvAMNVYPkjp7U9xM8HRbYXYx';
const geolocationkey = 'da38427041b344778648ff3361640fce'

var geofetch = 'https://api.ipgeolocation.io/ipgeo&apiKey=' + geolocationkey;



// both of these will need to be ran through two seprate fetches
// both fetches will need to occur after the location is typed in.
// weather will need to follow suit, however weather NEEDS Longitude and Latitude
// we can borrow that directly from either a bar result or a church result and display the weather of the nearest one
// this can be a pretty nice shortcut


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


$("form").on("click", "button", function (event) {
  event.preventDefault();


  //We need to figure out how to get this single event listener
  //to watch both search bars - - which I sucessfully did
  //and display the output of the one that has text in it
  // so that we don't have to have multiple event listeners or duplicate lines of code.


  // if($("#landing-search-value1").val().trim(undefined))

  // { var searchValue2 = $("input").val().trim()

  // } else if ($("input").val().trim(undefined)) 

  // { var searchValue1 = $("#landing-search-value1").val().trim()}


  if (searchValue !== $("input").val().trim(undefined)) {
    var searchValue = $("input").val().trim()
  }


  document.getElementById("landingPageContainer").style.display = "none";
  document.getElementById("outerInnerBody").style.display = "block";



  // console.log(searchValue);
  // getYelpChurches(searchValue)
  // getYelpBars(searchValue)
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ipAddress

function getIP() {  

$.ajax({
  url: 'https://api.ipify.org',
  method: 'GET',
  // dataType: 'JSON',
})

.done(function(ip){
ipAddress = ip
console.log(ipAddress)
getCurrentLATLON(ipAddress)
});

}  



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// getCurrentLATLON()

var longitude;
var latitude;

function getCurrentLATLON() {

  $.ajax({
    url: 'https://api.ipgeolocation.io/ipgeo?apiKey=' + geolocationkey + '&ip=' + ipAddress,
    method: 'GET',
    dataType: 'JSON',
  })

    .done(function (response) {
      console.log(response)
      latitude = response.latitude
      longitude =response.longitude
      console.log(response.latitude)
      console.log(response.longitude)
      
    });

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// getWeather()

function getWeather() {  


  $.ajax({
  
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=5de4fe643c36c638596fa3acd666e2a7",
    method: 'GET',
    dataType: 'JSON',
  })
  
  .done(function(weatherdata){
  console.log(weatherdata)
  });
  
  } 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////



function getYelpChurches(searchValue) {

  let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&offset=80";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${apiKey}`
    },
    data: {
      term: 'Church',
      location: searchValue
    }
  }).then(function (res) {
    console.log(res);
    console.log(res.businesses[0].name)
    console.log(res.businesses[0].review_count)
    console.log(res.businesses[0].image_url)
    console.log(res.businesses[0].url)

    var churchDiv = document.getElementById("churches")

    for (var i = 0; i < res.businesses.length; i++) {
      var array = [0]
      var churches = `
      <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
                <img src=${res.businesses[i].image_url}>
              <span class="card-title" id= "church-name">${res.businesses[i].name}</span>
          </div>
          <div class="card-content church-reviews">
            <p>Review Count: ${res.businesses[i].review_count}</p>
            <p class="review-number">Rating: ${res.businesses[i].rating}/5</p> 
          </div>
          <div class="card-action church-link">
              <button><a href=${res.businesses[i].url} target="_blank">Visit Website</a></button>
          </div>
        </div>
      </div>`

      array.push(churches)
      churchDiv.innerHTML = churches
      console.log(res.businesses[i].name)
    }
    // get number of bars displayed on screen
    var churchDiv = document.getElementById("church-num")
      var churchCount = `
      <div id="church-num">${res.total} Churches</div> 
      `
    churchDiv.innerHTML = churchCount

  });

}

function getYelpBars(searchValue) {


  let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&offset=80";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${apiKey}`
    },
    data: {
      term: 'Bar',
      location: searchValue
    }
  }).then(function (res) {
    console.log(res);
    console.log(res.businesses[0].name)
    console.log(res.businesses[0].review_count)
    console.log(res.businesses[0].image_url)
    console.log(res.businesses[0].url)

    var barDiv = document.getElementById("bars")

    for (var i = 0; i < res.businesses.length; i++) {
      var bars = `       
      <div class="col s12 m7">
          <div class="card">
          <div class="card-image">
              <img src=${res.businesses[i].image_url}>
              <span class="card-title">${res.businesses[i].name}</span>
          </div>
          <div class="card-content">
            <p>Review Count: ${res.businesses[i].review_count}</p>
            <p class="review-number">Rating: ${res.businesses[i].rating}/5</p> 
          </div>
          <div class="card-action">
            <button><a href=${res.businesses[i].url} target="_blank">Visit Website</a></button>
          </div>
          </div>
      </div>`

      barDiv.innerHTML = bars
      console.log(res.businesses[i].name)
    }

    // get number of bars displayed on screen
    var barDiv = document.getElementById("bar-num")

    var barCount = `
    <div id="bar-num">${res.total} Bars</div> 
    `

    barDiv.innerHTML = barCount

  });

}



//for the weather api
var yelpLat;
var yelpLon;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//append stuff here

function append() {


}


