const geocode = require('./geocode/geocode.js')
const yargs = require('yargs')

const weather = require('./weather/weather')

const argv = yargs
.option({
  a: {
    demand: true,
    alias: 'adress',
    describe: 'Adress to fetch weather for',
    tring: true
  }
})
.help()
.alias('help', 'h')
.argv

geocode.geocodeAddress(argv.adress, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage)
  }else{
    console.log(results.address)
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults)=>{
      if(errorMessage){
        console.log(errorMessage)
      }else{
        console.log(`It is currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`)
      }
    })
  }
})
