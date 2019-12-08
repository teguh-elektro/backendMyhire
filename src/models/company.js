require('dotenv/config')
const conn = require('../config/db')

const TABLE_COMPANY = process.env.MDL_COMPANY;

module.exports = {
    createCompany: (body) => {
        return new Promise ((resolve, reject) => {
            conn.query(`INSERT INTO ${TABLE_COMPANY} SET ?`, body, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    readCompany: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT companies.*, project.project AS project,  project.done AS done
            FROM companies
            LEFT JOIN (SELECT projects.id_company,COUNT(projects.id_company) AS project, SUM(projects.done) AS done  
            FROM projects
            GROUP BY projects.id_company) AS project ON project.id_company=companies.created_by`, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    readCompanyby: (params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT companies.*, project.project AS project,  project.done AS done
            FROM companies
            LEFT JOIN (SELECT projects.id_company,COUNT(projects.id_company) AS project, SUM(projects.done) AS done  
            FROM projects
            GROUP BY projects.id_company) AS project ON project.id_company=companies.created_by WHERE created_by = ?`, params, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    updateCompany: (body, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE ${TABLE_COMPANY} SET ? WHERE created_by = ?`, [body, params], (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    deleteCompany: (params) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM ${TABLE_COMPANY} WHERE created_by = ?`, params, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    }
}