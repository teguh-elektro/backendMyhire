require('dotenv/config')
const conn = require('../config/db')
const TABLE_USERS = process.env.MDL_USERS;

module.exports = {
    createUser: (body) => {
        return new Promise ((resolve, reject) => {
            conn.query(`INSERT INTO ${TABLE_USERS} SET ?`, body, (err, result) => {
                if(err) reject('the user was there')
                resolve(result)
            })
        })
    },
    readUser: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM ${TABLE_USERS}`, (err, result) => {
                if(err) reject('error')
                resolve(result)
            })
        })
    },
    updateUser: (body, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE ${TABLE_USERS} SET ? WHERE id = ?`, [body, params.id], (err, result) => {
                if(err) reject('error')
                resolve(result)
            })
        })
    },
    deleteUser: (params) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM ${TABLE_USERS} WHERE id = ?`, params, (err, result) => {
                if(err) reject('error')
                resolve(result)
            })
        })
    },
    searchUser: (body) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE username = ? AND password = ?`, [body.username, body.password], (err, result) => {
                if(err) reject('error')
                resolve(result)
            })
        })
    } 
}