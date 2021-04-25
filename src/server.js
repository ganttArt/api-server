'use strict';

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/cf401Lab4';
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true });

const familyRoutes = require('./routes/family-routes.js');
const petRoutes = require('./routes/pet-routes');
const notFound = require('./error-handlers/404.js');

app.use(express.json());

app.use(familyRoutes);
app.use(petRoutes);
app.use('*', notFound);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Server running on Port: ${port}`);
    });
  }
}
