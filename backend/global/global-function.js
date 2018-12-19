'use strict'
let config = require('../config/config')

function isAuthenticated(req, res, next) {
 let jwt = req.jwt
 jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
  if (err) {
   res.json({
    responseStatus: false,
    error: err
   })
  }
  req.customerId = decoded.customerId
  next()
 });
}

module.exports = isAuthenticated