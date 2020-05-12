const request = require('request')

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/1234566.json?access_token=pk.eyJ1IjoiYXp1cGF0ZWwiLCJhIjoiY2s5cGdhb2RnMDV0NTNlbzI0Y2J5MTdocCJ9.CstXNHd79_yRI5NAdjYDMg&limit=1'

const geocode = ( address, callback ) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXp1cGF0ZWwiLCJhIjoiY2s5cGdhb2RnMDV0NTNlbzI0Y2J5MTdocCJ9.CstXNHd79_yRI5NAdjYDMg&limit=1'
    
    request( { url , json: true }, ( error, response) => {

        if (error) {
            callback('Unable to connect to Internet ', undefined)
        } else if ( response.body.features.length === 0 ) {
            callback('Unable to find the location ', undefined)
        } else {
            callback ( undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode