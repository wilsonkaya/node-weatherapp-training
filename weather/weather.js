const request = require('request')
const API_KEY = "422bd7b79f4a51c4d07b33909c89fdf3"

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
     if(!error && response.statusCode === 200){
       callback(undefined,{
         temperature: body.currently.temperature,
         apparentTemperature: body.currently.apparentTemperature
       }
         )
     }else {
       callback('Unable to fertch weather')
     }
  })

}


module.exports.getWeather = getWeather
