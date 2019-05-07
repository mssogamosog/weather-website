const request  = require('request');

const location = (address, callback) => {
  const locationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXNvZ2Ftb3NvIiwiYSI6ImNqdjJqdWc1bTAycTM0Z21jbHJiazBmZ2IifQ.5Gd6ICnIPimb21dToN3NWw&limit=1';
  request({url: locationUrl, json: true},(error,{body, statusCode})=> {
    if (error) {
      callback('error connectiong to location api' , undefined);
    } else if (statusCode !== 200){
      callback(body.error, undefined);
    } else if(body.features.length === 0) {
      callback('no matches found')
    } else {
      const {place_name:locationName} = body.features[0];
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      callback(undefined ,{
        locationName,
        latitude,
        longitude
       });
    }
  })
} 

module.exports = location;