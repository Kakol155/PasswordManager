// const mysql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');
// const encoder = bodyParser.urlencoded({ extended: false });

// const app = express();
// app.use('/assets', express.static('assets'));

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'test_db',
// });

// connection.connect(function (error) {
//     if (error) throw error;
//     else console.log('Connected to the database successfully!');
// });

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// app.post('/', encoder, function (req, res) {
//     let username = req.body.username;
//     let password = req.body.password;

//     connection.query(
//         'SELECT * FROM userdata WHERE login = ? and password = ?',
//         [username, password],
//         function (error, results, fields) {
//             if (error) throw error;

//             if (results.length > 0) {
//                 res.redirect('/homepage');
//             } else {
//                 res.redirect('/');
//             }
//             res.end();
//         }
//     );
// });

// app.get('/homepage', function (req, res) {
//     res.sendFile(__dirname + '/homepage.html');
// });

// app.listen(1123);
