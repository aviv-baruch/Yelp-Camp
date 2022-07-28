const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const joi = require('joi');
const { campgroundSchema } = require('./schemas')
const methodOverride = require('method-override');
const catchAsync = require('./utils/catchAsync');
const campground = require('./models/campground');
const Campground = require('./models/campground');
const cors = require('cors');
const { INTERNAL_COMPUTE_OFFSET_SCRIPT } = require('selenium-webdriver/lib/input');
const ExpressError = require('./utils/ExpressError');
const app = express();



//use cors to allow cross origin resource sharing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//db connection
mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected")
})

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error)
    {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else
    {
        next()
    }
}

app.get('/', (req, res) => {
    res.send("Hello from YELP CAMP BACKEND!")
})

app.get('/campgrounds', catchAsync((async (req, res) => {
    const campgrounds = await campground.find({});
    res.send(campgrounds)
})))

app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {

    const campground = new Campground(req.body);
    await campground.save();
    res.send(campground._id)
}))

app.put(`/campgrounds/:id`, validateCampground, catchAsync((async (req, res) => {
    const { id } = req.body
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body })
    res.send(campground._id)
})))

app.delete('/campgrounds/:id', catchAsync((async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.send(`deleted ${id} successfully`)
})))


//api request ex
app.get("/api", (req, res) => {
    res.json({
        "users":
            ["userOne",
                "userTwo",
                "userThree",
                "userFour"]
    })
});

app.all('*', (res, req, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { message = "Something went wrong...", statusCode = 500 } = err;
    res.status(statusCode).send(message)
})


app.listen(5000, () => {  //React goes on 3000 by default, so express goes on 5000
    console.log("Server is up, Port 5000")
});