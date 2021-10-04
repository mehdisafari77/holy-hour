
//yelp API    https://api.yelp.com/v3




const apiKey = 'XuUUt7lnbYUG63HR5z0Su4ocNLuloHrt9lCfUn5UHT1vnKmSaYvi_IHTHfaUUHkVwkkxquBgDxLXFz3MX-PnVo2wxlnyLuoRy6v6a5quYvAMNVYPkjp7U9xM8HRbYXYx';


//This is an object
//contianing the church search result data
var searchRequest1 = {
    term:'church',
    location: searchQuery
  };

//this is an object
//containing the bars search result data
var searchRequest2 = {
    term:'bar',
    location: searchQuery
  };
// both of these will need to be ran through two seprate fetches
    // both fetches will need to occur after the location is typed in.
        // weather will need to follow suit, however weather NEEDS Longitude and Latitude
            // we can borrow that directly from either a bar result or a church result and display the weather of the nearest one
                // this can be a pretty nice shortcut







