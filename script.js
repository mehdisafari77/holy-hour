
//yelp API    https://api.yelp.com/v3

const apiKey = 'XuUUt7lnbYUG63HR5z0Su4ocNLuloHrt9lCfUn5UHT1vnKmSaYvi_IHTHfaUUHkVwkkxquBgDxLXFz3MX-PnVo2wxlnyLuoRy6v6a5quYvAMNVYPkjp7U9xM8HRbYXYx';
const geolocationkey = 'a455a329f72d49f388ef3860c0d2ba02'

var geofetch = 'https://api.ipgeolocation.io/ipgeo&apiKey=' + geolocationkey;

//This is an object
//contianing the church search result data

// var searchRequest1 = {
//     term:'church',
//     location: searchQuery
//   };

// //this is an object
// //containing the bars search result data
// var searchRequest2 = {
//     term:'bar',
//     location: searchQuery
//   };

// both of these will need to be ran through two seprate fetches
    // both fetches will need to occur after the location is typed in.
        // weather will need to follow suit, however weather NEEDS Longitude and Latitude
            // we can borrow that directly from either a bar result or a church result and display the weather of the nearest one
                // this can be a pretty nice shortcut


$("#search-button").on("click", function(event) {
    event.preventDefault();


    var searchValue = $("#search-value").val().trim()

    console.log(searchValue);
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

.done(function(latlon){
console.log(latlon)
});
  
}  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

getYelpChurches()

function getYelpChurches() {  

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
        location: 'San diego'
    }
  }).then(function (res) {
       console.log(res);
       console.log(res.businesses[0].name)
       console.log(res.businesses[0].review_count)
       console.log(res.businesses[0].image_url)
       console.log(res.businesses[0].url)
  });
  
}  




//input lat&lon
  //input search query specifying the search radius

//in a radius of 5 miles

    //list of bars
        //top reivew, or average review for each bar
      //amount of bars

    //list of churches
        //top reivew, or average review for each church
      //amount of churches


    //display both of them in separate list

  

getYelpBars()

function getYelpBars() {  


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
        location: 'San diego'
    }
  }).then(function (res) {
       console.log(res);
       console.log(res.businesses.length)
       console.log(res.businesses[0].name)
       console.log(res.businesses[0].review_count)
       console.log(res.businesses[0].image_url)
       console.log(res.businesses[0].url)
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




