const express = require('express')
const router = express.Router()

const {
    createEngineer,
    readEngineer,
    readEngineerby,
    updateEngineer,
    deleteEngineer,
    searchEngineer
} = require('../controllers/engineer')



router
    .get('/search/', searchEngineer)
    .post('/create', createEngineer)
    .get('/read', readEngineer)
    .get('/by/:id', readEngineerby)
    .put('/update/:id', updateEngineer)
    .delete('/delete/:id', deleteEngineer)
    .get('/test', (req, res) => {
        res.send('Hello, engineer!')
    });

module.exports = router