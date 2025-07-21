const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const recordRoutes = require('./routes/record_routes');

const app = express();

app.use(cors({
  origin: ['http://localhost:4200']
}));

app.listen(3000);

app.use(express.json());
// log request details to the console
app.use(morgan('dev'));

app.use('/app', recordRoutes);

app.use((req, res) => {
  res.status(404).send('Route not found');
});
