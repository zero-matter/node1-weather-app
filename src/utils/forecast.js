const request = require('request')

const forecast = ( latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=0a4625870ca12b3614c7129aa5193b0a&query=' + latitude + ',' + longitude 

    request ({ url , json: true }, (error, response) => {
        if (error) {
            callback ('Unable to connect to Internet', undefined )
        } else if ( response.body.error ) {
            callback ('Unable to find the location', undefined)
        } else {
            callback ( undefined, {
                currentTemp : response.body.current.temperature,
                feelTemp : response.body.current.feelslike    
            })
        }
    })
} 

module.exports = forecast
