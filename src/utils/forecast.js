const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/98865aa3e062e741b4bcf2beaacb2950/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({url, json: true}, (error, {body}) => {
                         if(error){
                             callback(chalk.red.bold('Unable to connect to weather service!'), undefined)
                         }
            
                         else if(body.error){
                             callback(chalk.red.bold('Unable to find location!'), undefined)
                         }
            
                         else{
                          console.log(body.daily.data[0])
                          callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + '°C out. The high today is ' + body.daily.data[0].temperatureHigh + '°C with a low of ' + body.daily.data[0].temperatureLow + '°C. There is a ' + body.currently.precipProbability + '% chance of rain.')
                         }
    })
}

module.exports = forecast