module.exports = {
  development: {
    DATABASE_URL: 'mongodb://localhost:27017/datapoint',
  },
  test: {
    DATABASE_URL: 'mongodb://localhost:27017/datapoint_test',
  },
  production: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
