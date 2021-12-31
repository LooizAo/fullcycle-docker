const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `CREATE TABLE people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), CONSTRAINT pk_people PRIMARY KEY (id));`;
connection.query(sql);
// connection.end();

const sql2 = `INSERT INTO people(name) values ('Luiz');`;
connection.query(sql2);


app.get('/', (req, res) => {
    const sql = 'SELECT * FROM people';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(`error: ${err}`);
        }

        let html = '<h1>Full Cycle</h1><h2>Lista</h2>';
        results.forEach(result => {
            html += `<li>${result.name}</li>`
        });

        res.send(html);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})