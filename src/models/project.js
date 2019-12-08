require('dotenv/config')
const conn = require('../config/db')

module.exports = {
    createProject: (body) => {
        return new Promise ((resolve, reject) => {
            conn.query(`INSERT INTO projects SET ?`, body, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    readEngineerProject: (body) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM projects WHERE id_engineer = ?`, body, 
            (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    readCompanyProject: (body) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM projects WHERE id_company = ?`, body, 
            (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    updateCompanyProject: (body, param1, param2) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE projects SET ? WHERE id = ? AND id_company = ?`, [body, param2, param1], (err, result) => {
                console.log(`UPDATE projects SET ${body} WHERE id = ${param2} AND id_company = ${param1}`);
                
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    updateEngineerProject: (body, param1, param2) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE projects SET ? WHERE id = ? AND id_engineer = ?`, [body, param2, param1], (err, result) => {
                console.log(`UPDATE projects SET ${body} WHERE id = ${param2} AND id_company = ${param1}`);
                
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    deleteProject: (param1, param2) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM projects WHERE id = ? AND id_company = ?`, [param2, param1], (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    }
}