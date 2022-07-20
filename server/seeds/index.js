const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const { application } = require('express');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database is up");
});
const genLorem = () => {
    const lorem = 'Necnunc esque faucibu lacusp egestas commodo tfusce laoreet nislqu. Ras tortorp uis scum ligulain tempusp. Fringi utcras nullap ultricie duis magnaqu natoque que nean. Turpisn enimsed rutruma feugiatm nean bibend cubilia sfusce fermen aenean. Eratetia bibendu enimdon iaculi vestib rutrum. Eleifend eleifen dumin uisque liquam ullam metusqui urient nean eratfus. Sque facilisi aliqua modnam sociis rhoncusv sed llam uam. Mus disse accums mi nisl turpis uam urnavest. Dictumst ornare que lobortis dui sapienma.';
    const start = Math.floor(Math.random() * lorem.length / 2)
    const end = start * 2
    return lorem.slice(start, end)
}
const price = () => Math.floor(Math.random() * 100)

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++)
    {
        const randomOneThousand = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[randomOneThousand].city}, ${cities[randomOneThousand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: genLorem(),
            price: price()
        })
        await camp.save();
    }
}

seedDB();