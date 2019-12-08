require('dotenv/config');
const mysql = require('mysql');

conn = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,
    database    : process.env.DB_DATABASE
});

conn.connect((err) => {
    if(err) 
        console.log("the database error: ", error);
    else    
        console.log("the database connected");
});

module.exports = conn;
