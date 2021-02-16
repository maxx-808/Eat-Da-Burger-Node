//Import MySQL connection
const connection = require("./connection");

// const vals = document.getElementById("burgerInput");

//Helper function for SQL syntax to ad question marks in query
const printQuestionMarks = (num) => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = (ob) => {
  const arr = [];

  // Loop through the keys and push the key/value as a string int arr
  for (const key in ob) {
    let value = ob[key];
    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = `'${value}'`;
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(`${key}=${value}`);
    }
  }

  // Translate array of strings to a single comma-separated string
  return arr.toString();
};

const orm = {
  selectAll(tableInput, cb) {
    // console.log("tableinput " + tableInput);
    // console.log("cb " + cb);
    const querySelect = `SELECT * FROM ${tableInput};`;
    connection.query(querySelect, (err, result) => {
      console.log("result ", result);
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne(table, vals, cb) {
    let queryInsert = `INSERT INTO ${table} (burger_name) VALUES ?`;

    console.log("query string: ", queryInsert);
    console.log("orm.js insertOne vals: ", vals);

    connection.query(queryInsert, vals, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("orm.js insertOne connection.query", vals);
      console.log(queryInsert);
    });
  },
  updateOne(table, objColVals, condition, cb) {
    let queryUpdate = `UPDATE ${table}`;

    queryUpdate += " SET ";
    queryUpdate += objToSql(objColVals);
    queryUpdate += " WHERE ";
    queryUpdate += condition;

    console.log(queryUpdate);
    connection.query(queryUpdate, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

//exporting orm object
module.exports = orm;
