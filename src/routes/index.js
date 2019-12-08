const express = require('express')
const router = express.Router()
const user = require('./user')
const company = require('./company')
const engineer = require('./engineer')
const app = require('./myhire')
var path = require('path');
const {
    tokenVerify
} = require('../controllers/auth')

router.use('/user', tokenVerify, user)
router.use('/engineer', engineer)
router.use('/company', tokenVerify, company)
router.use('/myhire', app)
router.get('/', (req, res) => {
    res.send('Hello World')
});

module.exports = router