const mysql = require('mysql');

const connection = mysql.createConnection({
    connectionLimit : 10,
    host: 'sql10.freemysqlhosting.net',
    port: 3306,
    user: 'sql10441685',
    password: 'yRIQkcwWY9',
    database: 'sql10441685'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database')
    } else {
        console.log('Success')
    }
})


module.exports = connection