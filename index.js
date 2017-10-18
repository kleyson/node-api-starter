require('dotenv').config();
const app = require('./src/app');
const db = require('./src/db');

db.connect();
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Running on ${PORT} port`));
