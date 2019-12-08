require('dotenv/config')
const appModel = require('../models/myhire')
const userModel = require('../models/user')
const companyModel = require('../models/company')
const engineerModel = require('../models/engineer')
const projectModel = require('../models/project')
const JWT = require('jsonwebtoken')
const { response } = require('../helper/send')
const bcrypt = require('bcrypt');
const multer = require('multer')
const fs = require('fs')

module.exports = {
    readUserData: async(req, res) => {
        const token = req.headers.authorization
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let id = data.id;
            let category = data.category
            if(category == 0) {
                console.log(id);
                
                const result = await engineerModel.readEngineerby(id)
                response(res, 200, result)
            } else if (category == 1) {
                const result = await companyModel.readCompanyby(id)
                response(res, 200, result)
            }
        }catch(error) {
            response(res, 500, {message: "databases error"})
        }
    },
    editUserData: async(req, res) => {
        const token = req.headers.authorization
        let file = '';
        try{ file = req.file.filename}
        catch(error){ file = null}
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let id = data.id;
            let category = data.category
            
            if(category == 0) {
                const {
                    name,
                    date_of_birth,
                    email,
                    phone_number,
                    location,
                    skill,
                    showcase,
                    description,
                    profession,
                    gender
                } = req.body

                let dataEngineer = {
                    name,
                    date_of_birth,
                    email,
                    phone_number,
                    location,
                    skill,
                    showcase,
                    description,
                    photo: file,
                    date_updated: new Date(),
                    created_by: id,
                    profession,
                    gender
                };
                const result = await engineerModel.readEngineerby(id)
                path = 'Image/' + result[0].photo;
                
                fs.unlink(path, (err) => {
                    if (err) {
                      response(res, 400, {message: 'the image failed to upload'})
                    }  
                    //file removed
                })
                const result2 = await engineerModel.updateEngineer(dataEngineer, id)
                response(res, 200, {message: 'the form submitted'})
            } else if (category == 1) {
                const {
                    name,
                    email,
                    phone_number,
                    location,
                    required_skill,
                    description
                } = req.body;

                let dataCompany = {
                    name,
                    email,
                    phone_number,
                    location,
                    required_skill,
                    description,
                    photo: file,
                    date_updated: new Date(),
                    created_by: id,
                }
                const result = await companyModel.readCompanyby(id)
                path = 'Image/' + result[0].photo;
                fs.unlink(path, (err) => {
                    if (err) {
                      response(res, 400, {message: 'the image failed to upload'})
                    }  
                    //file removed
                })
                const result2 = await companyModel.updateCompany(dataCompany, id)
                response(res, 200, {message: 'the form submitted'})
            } else {
                response(res, 406, {message: 'the user is not found'})
            }


        }catch(error) {
            console.log(error);
            
            response(res, 500, {message: 'the server is error'})
        }
    },
    deleteUserData: async(req, res) => {
        const token = req.headers.authorization
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let id = data.id;
            let category = data.category
            if(category == 0) {
                const result = await engineerModel.deleteEngineer(id)
                const result2 = await userModel.deleteUser(id)
                const result3 = await appModel.updateStatusToken(token, 0)
                response(res, 200, {message: 'the engineer user was deleted'})
            } else if (category == 1) {
                const result = await companyModel.deleteCompany(id)
                const result2 = await userModel.deleteUser(id)
                const result3 = await appModel.updateStatusToken(token, 0)
                response(res, 200, {message: 'the company user was deleted'})
            } else {
                response(res, 401, {message: 'the user is not there'})
            }
        }catch(error) {
            response(res, 500, {message: 'the server is error'})
        }
    },
    getValidUser: async(req, res) => {
        try{
            const result = await appModel.getValidUser(req.body)
            if(result[0] != 'undefined'){
                const token = JWT.sign(
                    { 
                        id: result[0].id,
                        category: result[0].category
                    },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: '24h'
                    }
                )
                const temp = await appModel.saveStatusToken(token, 1)
                
                let send = {
                    token: token,
                    category: result[0].category
                }
                response(res, 200, send)
            }   
        }catch(error) {
            response(res, 404, {message: 'the username and password is not valid'})
        }
    },
    blacklistToken: async(req, res) => {
        try{
            const token = req.headers.authorization
            const verify = await appModel.getStatusToken(token)
            if(verify[0].status == 0){
                response(res, 401, {message: 'the user was logout'})
            } else {
                const result = await appModel.updateStatusToken(token, 0)
                response(res, 200, {message: 'the username logout successful'})
            }
        }catch(error) {
            response(res, 500, {message: 'the server is error'})
        }
    },
    createUserData: async(req, res) => {
        const token = req.headers.authorization
        let file = '';
        try{ file = req.file.filename}
        catch(error){ file = null}
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let id = data.id;
            let category = data.category
            
            
            if(category == 0) { 
                const {
                    name,
                    date_of_birth,
                    email,
                    phone_number,
                    location,
                    skill,
                    showcase,
                    description,
                    profession
                } = req.body

                let dataEngineer = {
                    name,
                    date_of_birth,
                    email,
                    phone_number,
                    location,
                    skill,
                    showcase,
                    description,
                    photo: file,
                    date_created: new Date(),
                    date_updated: new Date(),
                    created_by: id,
                    profession
                };

                const result = await engineerModel.createEngineer(dataEngineer)
                response(res, 200, {message: 'the engineer user data was created'})

            } else if (category == 1) {
                const {
                    name,
                    email,
                    phone_number,
                    location,
                    required_skill,
                    description,
                } = req.body;

                let dataCompany = {
                    name,
                    email,
                    phone_number,
                    location,
                    required_skill,
                    description,
                    photo: file,
                    date_created: new Date(),
                    date_updated: new Date(),
                    created_by: id
                }
                
                const result = await companyModel.createCompany(dataCompany)
                response(res, 200, {message: 'the company user data was created'})

            } else {
                response(res, 401, {message: 'the user is not found'})
            }
        }catch(error) {
            console.log(error);
            
            response(res, 500, {message: 'the server is error'})
        }
    },
    registUser: async(req, res) => {
        try{
            const result = await userModel.createUser(req.body) 
            const token = JWT.sign(
                { 
                    id: result.insertId,
                    category: req.body.category
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '10m'
                }
            )
            const temp = await appModel.saveStatusToken(token, 1)
            let regist;
            if(req.body.category == 0){
                regist = {
                    id: result.insertId,
                    category: req.body.category,
                    token: token,
                    form: [
                        'name',
                        'date_of_birth', 
                        'email', 
                        'phone_number', 
                        'location', 
                        'skill',
                        'showcase',
                        'description',
                        'date_created',
                        'date_updated',
                        'created_by'
                    ]
                }
            } else {
                regist = {
                    id: result.insertId,
                    token: token,
                    category: req.body.category,
                    form: [
                        'name',
                        'email', 
                        'phone_number', 
                        'location', 
                        'required_skill', 
                        'description',
                        'photo',
                        'date_created',
                        'date_updated',
                        'created_by'
                    ]
                }
            }
            response(res, 200, regist)   
        }catch(error) {
            response(res, 406, {message: 'the username was there'})
        }
    },
    searchEngineerby: async(req, res) => {
        const token = req.headers.authorization
        try{
            const name = req.query.name;
            const skill = req.query.skill;
            const sort = req.query.sort;
            const limit = req.query.limit;
            const offset = req.query.offset;
            console.log(skill);

            let data = JWT.verify(token, process.env.JWT_SECRET);
            let category = data.category
            //if(category == 1) {
                const result = await engineerModel.searchEngineer(skill, sort, limit, offset);
                console.log(result);
                
                response(res, 200, result)
            /*    
            } else {
                response(res, 406, {message: 'you are not a company user'})
            }*/
        }catch(error) {
            console.log(error);
            
            response(res, 500, {message: 'the server is error'})
        }
    },
    uploadFile: async(req, res, next) => {
        try{
            let view = 'Image/'
            const storage = multer.diskStorage({
                destination: function(req, file, cb) {
                    cb(null, view);
                },
                filename: function(req, file, cb) {
                    let format = file.mimetype.split('/');
                    cb(null, Date.now() + '.' + format[1]);
                }
            });
              
            const fileFilter = (req, file, cb) => {
                // reject a file
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                  cb(null, true);
                } else {
                  cb(null, false);
                }
            };
            
            const upload = multer({
                storage: storage,
                limits: {
                  fileSize: 1024 * 1024 * 5
                },
                fileFilter: fileFilter
            }).single('photo');
            
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                  response(res, 404, {message: "the fieldname is not accepted"})
                  
                } else if (err) {
                }else {    
                    next();
                }
              })
        }catch(error){
            response(res, 500, {message: "the server is error"})
        }
    },
    changeProject: async(req, res) => {
        const token = req.headers.authorization
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let idToken = data.id;
            console.log(idToken);
            const {
                id,
                name,
                skill,
                description,
                id_engineer,
                budget,
                done
            } = req.body;

            let dataProject = {
                name,
                skill,
                description,
                id_company: idToken,
                id_engineer,
                budget,
                done
            }
            let idProject = id;
            console.log(idProject);
            
            const result = await projectModel.updateCompanyProject(dataProject, idToken, idProject)
            response(res, 200, {message: "the data was changed", result:result})
        }catch(error){
            console.log(error);
            
            response(res, 500, {message: "the server is error"})
        }
    },
    changeProjectDone: async(req, res) => {
        const token = req.headers.authorization
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let idToken = data.id;
            let category = data.category;
            if(category == '1'){
                console.log(idToken);
            
                const {
                    id,
                    done
                } = req.body;

                let dataProject = {
                    id_company: idToken,
                    done
                }
                let idProject = id;
                console.log(idProject);
                
                const result = await projectModel.updateCompanyProject(dataProject, idToken, idProject)
                response(res, 200, {message: "the data was changed", result:result})
            }else {
                response(res, 406, {message: "you are not company user"})
            }
            
        }catch(error){
            console.log(error);
            
            response(res, 500, {message: "the server is error"})
        }
    },
    changeProjectStatus: async(req, res) => {
        const token = req.headers.authorization
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let idToken = data.id;
            let category = data.category;
            if(category == '0'){
                console.log(idToken);
            
                const {
                    id,
                    status
                } = req.body;

                let dataProject = {
                    id_company: idToken,
                    status
                }
                let idProject = id;
                console.log(idProject);
                
                const result = await projectModel.updateEngineerProject(dataProject, idToken, idProject)
                response(res, 200, {message: "the data was changed", result:result})
            }else {
                response(res, 406, {message: "you are not engineer user"})
            }
            
        }catch(error){
            console.log(error);
            
            response(res, 500, {message: "the server is error"})
        }
    },
    changeDoProject: async(req, res) => {
        const token = req.headers.authorization
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let idToken = data.id;
            let category = data.category;
            if(category == '1'){
                console.log(idToken);
            
                const {
                    id,
                    name_engineer,
                    id_engineer
                } = req.body;

                let dataProject = {
                    id_company: idToken,
                    name_engineer,
                    id_engineer
                }
                
                let idProject = id;
                console.log(idProject);
                const result = await projectModel.updateCompanyProject(dataProject, idToken, idProject)
                response(res, 200, {message: "the data was changed", result:result})
            }else {
                response(res, 406, {message: "you are not company user"})
            }
            
        }catch(error){
            console.log(error);
            
            response(res, 500, {message: "the server is error"})
        }
    },
    createProject: async(req, res) => {
        const token = req.headers.authorization
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let id = data.id;
            const {
                name,
                skill,
                description,
                id_engineer,
                done
            } = req.body;

            let dataProject = {
                name,
                skill,
                description,
                id_company: id,
                id_engineer,
                done,
                status: '0'
            }
            console.log(dataProject);
            
            const result = await projectModel.createProject(dataProject);
            response(res, 200, {message: 'the project was created'})
        }catch(err){
            console.log(err);
            
            response(res, 500, {message: "the server is error"})
        }
    },
    readProject: async(req, res)=>{
        const token = req.headers.authorization
        try{
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let id = data.id;
            let category = data.category
            if(category == 0) {
                const result = await projectModel.readEngineerProject(id)
                response(res, 200, result)
            } else if (category == 1) {
                const result = await projectModel.readCompanyProject(id)
                response(res, 200, result)
            }
        }catch(error){
            response(res, 500, {message: "the server is error"})
        }
    },
    deleteProject: async(req, res) => {
        const token = req.headers.authorization
        try{
            const {id} = req.body;
            let data = JWT.verify(token, process.env.JWT_SECRET);
            let id_company = data.id;
            let id_index = id;
            console.log('id:'+id_index+' id_comp: '+id_company);
            
            const result = await projectModel.deleteProject(id_company, id_index);
            console.log(result);
            
            response(res, 200, {message:'the project was deleted'});
        }catch(err){
            console.log(err);
            
            response(res, 500, err)
        }
    }
}