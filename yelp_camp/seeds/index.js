const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error..."));
db.once("open", () => {
  console.log("database connected....");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image:"https://www.mountainlakemn.com/files/8115/3747/8769/Island_View_Campground.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam laudantium obcaecati tenetur beatae eius eligendi, est dolorem libero facilis modi nostrum quam debitis at, sint doloremque maxime fugiat voluptates vero.",
      price: random1000 * 1000,
    });
    await camp.save();
  }
};
seedDB().then(() => mongoose.connection.close());
