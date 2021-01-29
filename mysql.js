const mysql = require("mysql");

conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "form"
});

conn.connect((err) => {
    if (err) throw err;
    else {
        console.log("DB Connected ...");
    }
});

module.exports = conn;