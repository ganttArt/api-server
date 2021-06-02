'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const mongoose = require('mongoose');
// const MONGODB_URI = 'mongodb://localhost:27017/cf401Lab4';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cf401Lab4';
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true });

const todoRoutes = require('./routes/todo-routes');
const familyRoutes = require('./routes/family-routes.js');
const petRoutes = require('./routes/pet-routes');
const notFound = require('./error-handlers/404.js');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(todoRoutes);
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
