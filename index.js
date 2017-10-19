require('dotenv').config();
const app = require('./src/app');
const db = require('./src/db');

const env = process.env.NODE_ENV || 'development';
const config = require('./src/config')[env];

db.connect(config.DATABASE_URL);

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Running on ${PORT} port`));
