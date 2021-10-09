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
      location: "los angeles"
    }
  })