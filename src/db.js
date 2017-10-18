const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/datapoint';

exports.connect = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB.');
  });

  mongoose.connection.on('error', (error) => {
    console.error(`Error on connection: ${error}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.info('Disconnected from MongoDB.');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('App shutdown, connection closed.');
      process.exit(0);
    });
  });

  try {
    return await mongoose.connect(DATABASE_URL, { useMongoClient: true });
  } catch (err) {
    return err;
  }
};
