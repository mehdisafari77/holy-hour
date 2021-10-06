

//yelp API    https://api.yelp.com/v3

const apiKey = 'XuUUt7lnbYUG63HR5z0Su4ocNLuloHrt9lCfUn5UHT1vnKmSaYvi_IHTHfaUUHkVwkkxquBgDxLXFz3MX-PnVo2wxlnyLuoRy6v6a5quYvAMNVYPkjp7U9xM8HRbYXYx';
const geolocationkey = 'a455a329f72d49f388ef3860c0d2ba02'

var geofetch = 'https://api.ipgeolocation.io/ipgeo&apiKey=' + geolocationkey;



// both of these will need to be ran through two seprate fetches
// both fetches will need to occur after the location is typed in.
// weather will need to follow suit, however weather NEEDS Longitude and Latitude
// we can borrow that directly from either a bar result or a church result and display the weather of the nearest one
// this can be a pretty nice shortcut


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


$("#search-button").on("click", function (event) {
  event.preventDefault();


  var searchValue = $("#search-value").val().trim()

  console.log(searchValue);
  getYelpChurches(searchValue)
  getYelpBars(searchValue)
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// getIP()

// function getIP() {  

// $.ajax({
//   url: 'https://api.ipify.org',
//   method: 'GET',
//   dataType: 'JSON',
// })

// .done(function(ip){
// console.log(ip)
// });

// }  



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

getCurrentLATLON()

function getCurrentLATLON() {

  $.ajax({
    url: 'https://api.ipify.org',
    method: 'GET',
    dataType: 'JSON',
  })

    .done(function (latlon) {
      console.log(latlon)
    });

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



function getYelpChurches(searchValue) {

  let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

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
      var churches = `
        <div class="col s12 m7">
        <div class="card">
        <div class="card-image">
              <img src=${res.businesses[0].image_url}>
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

      churchDiv.innerHTML = churches
      console.log(res.businesses[i].name)
    }
      // get number of bars displayed on screen
      var churchDiv = document.getElementById("church-num")

      var churchCount = `
      <div id="church-num">${res.businesses.length} Churches</div> 
      `
      
      churchDiv.innerHTML = churchCount
          
  });

}

function getYelpBars(searchValue) {


  let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

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
                 <img src=${res.businesses[0].image_url}>
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
    <div id="bar-num">${res.businesses.length} Bars</div> 
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

//from latlon in yelp
// getWeather()

// function getWeather() {  


// $.ajax({

//   url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + yelpLat + "&lon=" + yelpLon + "&appid=5de4fe643c36c638596fa3acd666e2a7",
//   method: 'GET',
//   dataType: 'JSON',
// })

// .done(function(weatherdata){
// console.log(weatherdata)
// });

// }  


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//append stuff here

function append() {


}


