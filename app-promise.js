const yargs = require('yargs')
const axios = require('axios')


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

let encodedAdress = encodeURIComponent(argv.address)
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdress}`

axios.get(geocodeUrl).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find the adress')
  }
  let lat = response.data.results[0].geometry.location.lat
  let lng = response.data.results[0].geometry.location.lng

  let weatherUrl =`https://api.darksky.net/forecast/422bd7b79f4a51c4d07b33909c89fdf3/${lat},${lng}`
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherUrl)
})
.then((response) => {
  let temperature = response.data.currently.temperature
  let apparentTemperature  = response.data.currently.apparentTemperature
  console.log(`It is currently ${temperature} and feels like ${apparentTemperature}`);
})
.catch((e)=>{
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect API server')
  }else{
    console.log(e.message)
  }
})
