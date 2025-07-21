const express = require('express');
const morgan = require('morgan');
const recordRoutes = require('./routes/record_routes');

const app = express();

app.listen(3000);

app.use(express.json());
// log request details to the console
app.use(morgan('dev'));

app.use('/app', recordRoutes);

app.use((req, res) => {
  res.status(404).send('Route not found');
});
