const request = require('request')


const geocodeAddress = (address, callback) => {
  let encodedAdress = encodeURIComponent(address)

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdress}`,
    json: true
  }, (error, rosponse, body) => {
    if(error){
      callback('Unable to connect to Google server')
    }else if(body.status === 'ZERO_RESULTS'){
      callback('Unable to find this adress')
    }else if (body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports = {
  geocodeAddress
}
