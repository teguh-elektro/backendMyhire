const express = require('express')
const router = express.Router()

const {
    createCompany,
    readCompany,
    readCompanyby,
    updateCompany,
    deleteCompany
} = require('../controllers/company')

router
    .post('/create', createCompany)
    .get('/read', readCompany)
    .get('/by/:id', readCompanyby)
    .put('/update/:id', updateCompany)
    .delete('/delete/:id', deleteCompany)
    .get('/test', (req, res) => {
        res.send('Hello, company!')
    });

module.exports = router