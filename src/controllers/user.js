const userModel = require('../models/user')
const bcrypt = require('bcrypt');


module.exports = {
    createUser: async(req, res) => {
        try{
            const result = await userModel.createUser(req.body)
            res.send(result)
        }catch(error) {
           
            res.send(error)
        }
    },
    readUser: async(req, res) => {
        try{
            const result = await userModel.readUser()
            res.send(result)
        }catch(error) {
         
            res.send(error)
        }
    },
    updateUser: async(req, res) => {
        try{
            const result = await userModel.updateUser(req.body, req.params)
            res.send(result)
        }catch(error) {
          
            res.send(error)
        }
    },
    deleteUser: async(req, res) => {
        try{
            const result = await userModel.deleteUser(req.params)
            res.send(result)
        }catch(error) {
           
            res.send(error)
        }
    }
}