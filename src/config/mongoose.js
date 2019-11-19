require('dotenv/config');
const mongoose = require('mongoose');

const connectDb = () => {
  const mongoUri = process.env.MONGO_DATABASE;
  const mongoOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

  return mongoose.connect(mongoUri, mongoOptions);
};

module.exports = connectDb;
