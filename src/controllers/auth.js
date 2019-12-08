require('dotenv/config')
const JWT = require('jsonwebtoken')
const appModel = require('../models/myhire')
const { response } = require('../helper/send')

module.exports = {
  tokenVerify: async (req, res, next) => {
    const token = req.headers.authorization
    const verify = await appModel.getStatusToken(token)
    try{
        let error1 = verify[0].status;
        if(verify[0].status === 0) {
          error1 = 1;
        }
        else{
          error1 = 0;
        }
        JWT.verify(token, process.env.JWT_SECRET, (err, result) => {
          if (err && err.name === 'TokenExpiredError') {
            response(res, 401, {message: 'the token expired'})
          }
          else if(error1){
            response(res, 401, {message: 'the token is erorr'})
          }
          else if(err && err.name === 'JsonWebTokenError') {
            response(res, 401, {message: 'the token is erorr'})
          }
          else {
            next();
          }
        }) 
    } catch(error) {
      response(res, 401, {message: 'the token is erorr'})
    }
  }
}