const mongoose = require('mongoose');

const connectToMongo = async () => {
    await mongoose.connect(process.env.DBURL);
    console.log('Successfully connected to Mongo');
}

module.exports = connectToMongo;