const userModel = require('../models/company')

module.exports = {
    createCompany: async(req, res) => {
        try{
            const result = await userModel.createCompany(req.body)
            res.send(result)
        }catch(error) {
            
            res.send(error)
        }
    },
    readCompany: async(req, res) => {
        try{
            const result = await userModel.readCompany()
            res.send(result)
        }catch(error) {
            
            res.send(error)
        }
    },
    readCompanyby: async(req, res) => {
        try{
            const result = await userModel.readCompanyby()
            res.send(result)
        }catch(error) {
           
            res.send(error)
        }
    },
    updateCompany: async(req, res) => {
        try{
            const result = await userModel.updateCompany(req.body, req.params)
            res.send(result)
        }catch(error) {
            
            res.send(error)
        }
    },
    deleteCompany:  async(req, res) => {
        try{
            const result = await userModel.deleteCompany(req.params)
            res.send(result)
        }catch(error) {
            
            res.send(error)
        }
    }
}