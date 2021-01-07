const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Why9076ba11!",
  database: "burgers_db",
});

connection.connect((err) => {
  if (err) {
    console.error(`error conecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;
