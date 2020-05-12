const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

//Define the path for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views path 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', ( req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Azad Patel'
    })
})

app.get('/about', ( req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Azad Patel'
    })
})

app.get('/help', ( req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Azad Patel',
        helpText: "This website shows the weather of the place"
    })
})


app.get ( '/weather', ( req, res) => {

    const address = req.query.address 

    if(!address){
        return res.send ({
            error: 'You must provide the address'
        })    
    }

    geocode( address, (error, {latitude, longitude, location} = {} ) => {

        if (error) {
            return res.send({error})
        }
        forecast( latitude, longitude, (error, { currentTemp, feelTemp }) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: 'The weather of your place is ' + currentTemp + ' degree. It feels like ' + feelTemp + '.',
                address,
                location
            })
        })

    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen( 3000, () => {
    console.log('Server is up and running on port 3000.')
})