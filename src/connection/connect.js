const mysql = require('mysql');

const connection = mysql.createConnection({
    connectionLimit : 10,
    host: 'remotemysql.com',
    port: 3306,
    user: 'rfQy5kOgHJ',
    password: 'W4ph6N1WIS',
    database: 'rfQy5kOgHJ'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database')
    } else {
        console.log('Success')
    }
})


module.exports = connection