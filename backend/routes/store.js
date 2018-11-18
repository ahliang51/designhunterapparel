'use strict'
// Import
let express = require('express')
let router = express.Router()
let async = require('async')
let config = require('../config/config')

router.get('/contact-us', (req, res, next) => {
 let bigCommerce = req.bigCommerce;
 bigCommerce.get('/pages').then(pages => {
  for (let page of pages) {
   if (page.name.includes("Contact")) {
    console.log(page)
    res.json({
     responseStatus: false,
     page: page
    })
   }
  }
 }).catch(err => {

 })
 res.json({
  responseStatus: false,
  error: "No Such Page"
 })
})

module.exports = router