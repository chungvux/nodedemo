const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'db_node'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database')
    } else {
        console.log('Success')
    }
})


module.exports = connection