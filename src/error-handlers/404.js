'use strict';

module.exports = (req, res, next) => {
  res.status(404).json({ msg: 'Route not found' });
  next();
}
