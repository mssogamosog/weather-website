const express = require('express');

const path = require('path');
const hbs = require('hbs');
const location = require('../src/utils/location');
const forecast = require('../src/utils/forecast');

const app = express();

// Define paths for express config
const publicPath =  path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('',(req, res)=> {
  res.render('index', {
    title: 'Weather app',
    name: 'MSSG'
  });
})

app.get('/about',(req, res)=> {
  res.render('about', {
    title: 'About .',
    name: 'MSSG'
  });
})

app.get('/help',(req, res)=> {
  res.render('help', {
    title: 'Help .',
    message: 'Hi'
  });
})


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.status(400).send({error: 'address must be provided'});
    return;
  }
  location(req.query.address,(error,{locationName ,latitude,longitude}={})=> {
    if (error) {
      res.send({error: error})
      return;
    }
    
    forecast( latitude,longitude,(error,forecastData)=> {
      if (error) {
        res.send({error: error})
        return;
      }
      const resObject = {
        locationName: locationName,
        forecastData: forecastData,
        address: req.query.address
      } 
      res.send(resObject);
    })
  })
})

app.get('/help/*',(req,res)=> {
  res.render('error', {
    message: 'Help article not found'
  });
})

app.get('*',(req,res)=> {
  res.render('error', {
    title: 'Weather app',
    message: 'Page not found 404'
  });
})
app.listen(3000, ()=> {
  console.log('server running on port 3000')
})