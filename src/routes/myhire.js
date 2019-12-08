const express = require('express')
const router = express.Router()
const path = require('path')
const {
    readUserData,
    editUserData,
    deleteUserData,
    getValidUser,
    blacklistToken,
    createUserData,
    registUser,
    searchEngineerby,
    uploadFile,
    readProject,
    changeProject,
    createProject,
    deleteProject,
    changeProjectDone,
    changeProjectStatus,
    changeDoProject

} = require('../controllers/myhire')

const {
    createUser
} = require('../controllers/user')


// require('../../././src') '/Users/Teguh Setiawan/Documents/pelatihan/tgl 21 11 19/Myhire/scr'
var directories = path.dirname('./');

const {
    tokenVerify
} = require('../controllers/auth')

const { response } = require('../helper/send')



router
    .get('/by', tokenVerify,  readUserData)
    .put('/edit', tokenVerify, uploadFile, editUserData)
    .put('/changeproject', tokenVerify, changeProject)
    .put('/doneproject', tokenVerify, changeProjectDone)
    .put('/statusproject', tokenVerify, changeProjectStatus)
    .put('/engineerproject', tokenVerify, changeDoProject)
    .post('/createproject', tokenVerify, createProject)
    .get('/readproject', tokenVerify, readProject)
    .delete('/deleteproject', tokenVerify, deleteProject)
    .post('/login', getValidUser)
    .get('/logout', blacklistToken)
    .get('/search', tokenVerify, searchEngineerby)
    .delete('/delete', tokenVerify, deleteUserData)
    .post('/regis', registUser)
    .post('/form', tokenVerify, uploadFile, createUserData)
    .get('/test', (req, res) => {
        response(res, 200, {message: 'Hello, it\'s test'})
    });

router.get('/file/:name', function (req, res, next) {
        var options = {
          root: path.join(directories, 'Image'),
          dotfiles: 'deny',
          headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
          }
        }
      
        var fileName = req.params.name
        res.sendFile(fileName, options, function (err) {
          if (err) {
            next(err)
          } else {
    
          }
        })
      })

module.exports = router