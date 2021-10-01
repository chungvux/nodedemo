const mysql = require('mysql');

const connection = mysql.createConnection({
    connectionLimit : 10,
    host: 'mysql-52666-0.cloudclusters.net',
    port: 17194,
    user            : 'admin',
    password        : 'SOSQFMGI',
    database        : 'db_node'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database')
    } else {
        console.log('Success')
    }
})


module.exports = connection