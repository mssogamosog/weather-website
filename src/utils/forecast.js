const request  = require('request');
const forecast = (latitude,longitude ,callback) => {
  const forecatsUrl =  'https://api.darksky.net/forecast/a433f35fedaba5df746dc2536881b6ed/'+ latitude + ',' + longitude +'?units=si&lang=en';
  request({url: forecatsUrl, json: true},(error,response)=> {
    if (error) {
      callback('error connectiong to wheather api', undefined)
    } else if (response.statusCode !== 200){
      callback(response.body.error, undefined);
    }
    else {
      const temperature = response.body.currently.temperature;
      const precipitationProb = response.body.currently.precipProbability;
      const todaySummary = response.body.daily.data[0].summary;
      const place = response.body.timezone;
      callback(undefined, 'In ' + place + ' ' + todaySummary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipitationProb + '% chande of rain');
    }
  })
}

module.exports = forecast;