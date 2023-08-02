const mysql = require('mysql2');
require('dotenv').config();
// creates connection to sql db
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// connects to sql and does a console log to tell you that you are connected
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the company_db database.");
});

module.exports = connection;