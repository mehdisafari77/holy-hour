
//yelp API    https://api.yelp.com/v3




const apiKey = 'XuUUt7lnbYUG63HR5z0Su4ocNLuloHrt9lCfUn5UHT1vnKmSaYvi_IHTHfaUUHkVwkkxquBgDxLXFz3MX-PnVo2wxlnyLuoRy6v6a5quYvAMNVYPkjp7U9xM8HRbYXYx';
const geolocationkey = 'a455a329f72d49f388ef3860c0d2ba02'

// var geofetch = 'https://api.ipgeolocation.io/ipgeo&apiKey=' + geolocationkey;








//This is an object
//contianing the church search result data
// var searchRequest1 = {
//     term:'church',
//     location: searchQuery
//   };

//this is an object
//containing the bars search result data
// var searchRequest2 = {
//     term:'bar',
//     location: searchQuery
//   };
// both of these will need to be ran through two seprate fetches
    // both fetches will need to occur after the location is typed in.
        // weather will need to follow suit, however weather NEEDS Longitude and Latitude
            // we can borrow that directly from either a bar result or a church result and display the weather of the nearest one
                // this can be a pretty nice shortcut


// Geolocation.getCurrentPosition()




getIP()

function getIP() {  

$.ajax({
  url: 'https://api.ipify.org',
  method: 'GET',
  dataType: 'JSON',
})

.done(function(ip){
console.log(ip)
});
  
}  

getLATLON()

function getLATLON() {  

$.ajax({
  url: 'https://api.ipify.org',
  method: 'GET',
  dataType: 'JSON',
})

.done(function(latlon){
console.log(latlon)
});
  
}  

getyelp()

function getyelp() {  

$.ajax({
  url: 'https://api.ipify.org',
  method: 'GET',
  dataType: 'JSON',
})

.done(function(yelpdata){
console.log(yelpdata)
});
  
}  



//from latlon in yelp
getWeather()

function getWeather() {  

$.ajax({
  url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + _ + "&lon=" + _ + "&appid=5de4fe643c36c638596fa3acd666e2a7",
  method: 'GET',
  dataType: 'JSON',
})

.done(function(weatherdata){
console.log(weatherdata)
});
  
}  