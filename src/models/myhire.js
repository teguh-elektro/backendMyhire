const conn = require('../config/db')

const TABLE_USERS = process.env.MDL_USERS;

module.exports = {
    getCategory: (username) => {
        return new Promise ((resolve, reject) => {
                conn.query(`SELECT * FROM users WHERE id = ?`, username, (err, result) => {
                    if(err) reject(err)
                    resolve(result[0])
                })
            })
    },
    getValidUser: (body) =>{
        return new Promise ((resolve, reject) => {
            conn.query(`SELECT id, category FROM users WHERE username = ? AND password = ?`, [body.username, body.password], (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    getStatusToken: (token) => {
        return new Promise ((resolve, reject) => {
            conn.query(`SELECT status FROM tokens WHERE token = ?`, token, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    saveStatusToken: (token, status) => {
        return new Promise ((resolve, reject) => {
            conn.query(`INSERT INTO tokens SET token = ?, status = ?`, [token, status], (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    },
    updateStatusToken: (token, status) => {
        return new Promise ((resolve, reject) => {
            conn.query(`UPDATE tokens SET status = ? WHERE token = ?`, [status, token], (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    }
}