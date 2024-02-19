const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const encoder = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_db',
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        throw err;
    } else {
        console.log('Connected to MySQL database');
    }
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS UserData (
        id INT AUTO_INCREMENT PRIMARY KEY,
        login VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`;

connection.query(createTableQuery, err => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('UserData table created or already exists');
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', encoder, function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    connection.query(
        'SELECT * FROM userdata WHERE login = ? and password = ?',
        [username, password],
        function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                res.redirect('/homepage');
            } else {
                res.redirect('/');
            }
            res.end();
        }
    );
});

app.post('/save-data', (req, res) => {
    const data = req.body;

    const insertQuery = 'INSERT INTO UserData (login, email, password) VALUES (?, ?, ?)';
    connection.query(insertQuery, [data.login, data.email, data.password], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ error: 'Error saving data' });
        } else {
            console.log('Data saved to the database:', data);
            res.json({ message: 'Data saved successfully' });
        }
    });
});

app.get('/homepage', function (req, res) {
    res.sendFile(__dirname + '/homepage.html');
});

app.listen(port, () => {
    console.log(`The server runs on the port ${port}`);
});
