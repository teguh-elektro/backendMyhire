const express = require('express')
const router = express.Router()
const {
    createUser,
    readUser,
    updateUser,
    deleteUser
} = require('../controllers/user')



router
    .post('/create', createUser)
    .get('/read', readUser)
    .put('/update/:id', updateUser)
    .delete('/delete/:id', deleteUser)
    .get('/test', (req, res) => {
        res.send('Hello, user!')
    });

module.exports = router