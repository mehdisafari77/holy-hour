

//yelp API    https://api.yelp.com/v3

const apiKey = 'XuUUt7lnbYUG63HR5z0Su4ocNLuloHrt9lCfUn5UHT1vnKmSaYvi_IHTHfaUUHkVwkkxquBgDxLXFz3MX-PnVo2wxlnyLuoRy6v6a5quYvAMNVYPkjp7U9xM8HRbYXYx';
// const geolocationkey = 'a455a329f72d49f388ef3860c0d2ba02'
const geolocationkey = 'da38427041b344778648ff3361640fce'
var geofetch = 'https://api.ipgeolocation.io/ipgeo&apiKey=' + geolocationkey;



// both of these will need to be ran through two seprate fetches
// both fetches will need to occur after the location is typed in.
// weather will need to follow suit, however weather NEEDS Longitude and Latitude
// we can borrow that directly from either a bar result or a church result and display the weather of the nearest one
// this can be a pretty nice shortcut


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   searchValue


$(".dropdown-trigger").dropdown();

var allCities = JSON.parse(localStorage.getItem("saved-city")) || [];

function saveCity() {
  allCities.unshift(searchValue);
  showCity(searchValue);
  localStorage.setItem("saved-city", JSON.stringify(allCities));
}

function showCity() {
  if (allCities.length > 5) {
    allCities.pop();
  }
  console.log(allCities);
  document.getElementById("first-city").innerHTML = allCities[0];
  document.getElementById("second-city").innerHTML = allCities[1];
  document.getElementById("third-city").innerHTML = allCities[2];
  document.getElementById("fourth-city").innerHTML = allCities[3];
  document.getElementById("fifth-city").innerHTML = allCities[4];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var searchValue;



$("form").on("click", "#search-button", function (event) {
  event.preventDefault();


  searchValue = $("#search-value").val().trim();

  console.log(searchValue);
  getYelpChurches(searchValue);
  getYelpBars(searchValue);
  saveCity(searchValue);
})

$("form").on("click", "#landing-search-button", function (event) {
  event.preventDefault();


  searchValue = $("#landing-search-value1").val().trim();
  console.log(searchValue);
  getYelpChurches(searchValue);
  getYelpBars(searchValue);
  saveCity(searchValue);
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#landingGEOButton").on("click", function (event) {
  event.preventDefault();

document.getElementById("landingPageContainer").style.display = "none";
document.getElementById("outerInnerBody").style.display = "block";

})
$("#mGEOButton").on("click", function (event) {
  event.preventDefault();

document.getElementById("landingPageContainer").style.display = "none";
document.getElementById("outerInnerBody").style.display = "block";
getIP()
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ipAddress;
getIP()

function getIP() {

  $.ajax({
    url: 'https://api.ipify.org',
    method: 'GET',
    // dataType: 'JSON',
  })

    .done(function (ip) {
      ipAddress = ip
      console.log(ipAddress)
      getCurrentLATLON(ipAddress)
    });

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// getCurrentLATLON()

var geolongitude;
var geolatitude;
var mathLatitude;
var mathLongitude;

function getCurrentLATLON() {

  $.ajax({
    url: 'https://api.ipgeolocation.io/ipgeo?apiKey=' + geolocationkey + '&ip=' + ipAddress,
    method: 'GET',
    dataType: 'JSON',
  })

    .done(function (response) {
      console.log("this is geo response", response)
      geolatitude = response.latitude;
      geolongitude = response.longitude;
      console.log("this is response lat", response.latitude)
      console.log(response.longitude)

      
      getGeoWeather(geolongitude, geolatitude);
      getYelpGEOChurches(geolatitude, geolongitude);
      getYelpGEOBars(geolatitude, geolongitude);

    });


}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getGeoWeather() {
  console.log("geoweather");
  $("#currentIcon").remove();
  $("#currentIcon").remove();
  // console.log(mathLatitude, mathLongitude);
  // var okay = mathLatitude;
  // var oman = mathLongitude;


  $.ajax({

    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + geolatitude + "&lon=" + geolongitude +
      "&exclude=minutely,hourly,alerts&units=imperial&appid=bcf0f3e083d40c7832b737bfb3c1e368",
    method: 'GET',
    dataType: 'JSON',
  })

    .done(function (weatherData) {
      console.log(weatherData);
      var icon = "https://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + "@2x.png";
      $("#weatherInfo").append("<img id='currentIcon' src='http://openweathermap.org/img/wn/04n@2x.png' alt='icon of current weather'>");
      $(currentIcon).attr('srv', icon);
      $("#weatherHigh").text(weatherData.daily[0].temp.max);
      $("#weatherLow").text(weatherData.daily[0].temp.min);
    });
}



function getYelpGEOChurches(geolatitude, geolongitude) {

  let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50";

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
      longitude: geolongitude,
      latitude: geolatitude
    }
  }).then(function (res) {
    // console.log(res);
    // console.log(res.businesses[0].name)
    // console.log(res.businesses[0].review_count)
    // console.log(res.businesses[0].image_url)
    // console.log(res.businesses[0].url)

    var churchDiv = document.getElementById("churches")
    var churchArray = []

    for (var i = 0; i < res.businesses.length; i++) {

      var church = `
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


      churchArray.push(church)
      // console.log(churchArray)
      // console.log(res.businesses[i].name)
    }
    churchDiv.innerHTML = churchArray.join(" ")

    // get number of bars displayed on screen
    var churchDiv = document.getElementById("church-num")
    var churchCount = `
      <div id="church-num">${res.total} Churches</div> 
      `
    churchDiv.innerHTML = churchCount

  });

}

function getYelpGEOBars(geolatitude, geolongitude) {


  let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50";

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
      latitude: geolatitude,
      longitude: geolongitude
    }
  }).then(function (res) {
    // console.log(res);
    // console.log(res.businesses[0].name)
    // console.log(res.businesses[0].review_count)
    // console.log(res.businesses[0].image_url)
    // console.log(res.businesses[0].url)

    // var yelpLat = res.region.center.latitude
    // var yelpLon = res.region.center.longitude

    // console.log(yelpLon)
    // console.log(yelpLat)
    var barDiv = document.getElementById("bars")

    var barArray = []

    for (var i = 0; i < res.businesses.length; i++) {
      var bar = `       
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

      barArray.push(bar)
      // console.log(barArray)

      // console.log(res.businesses[i].name)
    }
    barDiv.innerHTML = barArray.join(" ")


    // get number of bars displayed on screen
    var barDiv = document.getElementById("bar-num")

    var barCount = `
    <div id="bar-num">${res.total} Bars</div> 
    `

    barDiv.innerHTML = barCount

  });


}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getYelpChurches(searchValue) {

  let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${apiKey}`,



//we do need an error slip up somewhere around here



    },
    data: {
      term: 'Church',
      location: searchValue
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }).then(function (res) {
    $("#currentIcon").remove();
    $("#currentIcon").remove();
    //easy way to clear weather icon to prevent duplicates from stacking up
    // console.log(res);
    // console.log(res.businesses[0].name)
    // console.log(res.businesses[0].review_count)
    // console.log(res.businesses[0].image_url)
    // console.log(res.businesses[0].url)



    var churchDiv = document.getElementById("churches")
    var churchArray = []

    for (var i = 0; i < res.businesses.length; i++) {

      var church = `
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


      churchArray.push(church)
      // console.log(churchArray)
      // console.log(res.businesses[i].name)
    }
    churchDiv.innerHTML = churchArray.join(" ")

    // get number of bars displayed on screen
    var churchDiv = document.getElementById("church-num")
    var churchCount = `
      <div id="church-num">${res.total} Churches</div> 
      `
    churchDiv.innerHTML = churchCount;
      document.getElementById("landingPageContainer").style.display = "none";
      document.getElementById("outerInnerBody").style.display = "block";
  });

}

var yelpLon;
var yelpLat;

function getYelpBars(searchValue) {


  let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50";

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
    // console.log(res);
    // console.log(res.businesses[0].name)
    // console.log(res.businesses[0].review_count)
    // console.log(res.businesses[0].image_url)
    // console.log(res.businesses[0].url)

    var yelpLat = res.region.center.latitude
    var yelpLon = res.region.center.longitude

    // console.log(yelpLon)
    // console.log(yelpLat)
    var barDiv = document.getElementById("bars")

    var barArray = []

    for (var i = 0; i < res.businesses.length; i++) {
      var bar = `       
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

      barArray.push(bar)
      // console.log(barArray)

      // console.log(res.businesses[i].name)
    }
    barDiv.innerHTML = barArray.join(" ")


    // get number of bars displayed on screen
    var barDiv = document.getElementById("bar-num")

    var barCount = `
    <div id="bar-num">${res.total} Bars</div> 
    `

    barDiv.innerHTML = barCount

    getWeather(yelpLat, yelpLon)
  });


}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// from latlon in yelp


// function getWeather() {


//   $.ajax({

//     url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + yelpLat + "&lon=" + yelpLon + "&appid=5de4fe643c36c638596fa3acd666e2a7",
//     method: 'GET',
//     dataType: 'JSON',
//   })

//     .done(function (weatherdata) {
//       console.log(weatherdata)
//     });

// }
function getWeather(yelpLat, yelpLon) {
//   console.log("Getting Yelp Weather");
//   // console.log(mathLatitude, mathLongitude);
//   // var okay = mathLatitude;
//   // var oman = mathLongitude;


  $.ajax({

    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + yelpLat + "&lon=" + yelpLon +
      "&exclude=minutely,hourly,alerts&units=imperial&appid=bcf0f3e083d40c7832b737bfb3c1e368",
    method: 'GET',
    dataType: 'JSON',
  })

    .done(function (weatherData) {
      console.log(weatherData);
      var icon = "https://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + "@2x.png";
      $("#weatherInfo").append("<img id='currentIcon' src='http://openweathermap.org/img/wn/04n@2x.png' alt='icon of current weather'>");
      $(currentIcon).attr('srv', icon);
      $("#weatherHigh").text(weatherData.daily[0].temp.max);
      $("#weatherLow").text(weatherData.daily[0].temp.min);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//append stuff here

function append() {


}


