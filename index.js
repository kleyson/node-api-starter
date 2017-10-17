const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'DataPoint API' });
});

console.log('Thing');

app.listen('4444', () => console.log('Running on 4000 port'));
