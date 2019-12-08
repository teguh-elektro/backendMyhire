require('dotenv/config')
const conn = require('../config/db')

const TABLE_ENGINEER = process.env.MDL_ENGINEER;

module.exports = {
    createEngineer: (body) => {
        return new Promise ((resolve, reject) => {
            conn.query(`INSERT INTO ${TABLE_ENGINEER} SET ?`, body, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    readEngineer: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT engineers.*, project.project AS project,  project.done AS done
            FROM engineers
            LEFT JOIN (SELECT projects.id_engineer,COUNT(projects.id_engineer) AS project, SUM(projects.done) AS done  
            FROM projects
            GROUP BY projects.id_engineer) AS project ON project.id_engineer=engineers.created_by`, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    readEngineerby: (params) => {
        
        return new Promise((resolve, reject) => {
            console.log(params);
            
            conn.query(`SELECT engineers.*, project.project AS project,  project.done AS done
            FROM engineers
            LEFT JOIN (SELECT projects.id_engineer,COUNT(projects.id_engineer) AS project, SUM(projects.done) AS done  
            FROM projects
            GROUP BY projects.id_engineer) AS project ON project.id_engineer=engineers.created_by WHERE engineers.created_by = ?`, params, (err, result) => {
                if(err) reject(err)
                resolve(result)  

            })

        })
    },
    updateEngineer: (body, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE ${TABLE_ENGINEER} SET ? WHERE created_by = ? `, [body, params], (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    deleteEngineer: (params) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM ${TABLE_ENGINEER} WHERE created_by = ?`, params, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    searchEngineer: (skill = '', sort = 'name', limit = 10, offset = 0) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM engineers WHERE skill LIKE '%${skill}%' ORDER BY ${sort} ASC LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    }
}