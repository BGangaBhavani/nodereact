const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bhanu@24",
  database: "task",
});

app.get("/api/v1/employees", (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
});

app.get("/api/v1/employees/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM employees WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json(result);
  });
});
app.post("/api/v1/employees", (req, res) => {
  const sql =
    "INSERT INTO employees (name,department,salary,gender,dob) VALUES (?)";

  const values = [
    req.body.name,

    req.body.department,

    req.body.salary,

    req.body.gender,

    req.body.dob,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
});
app.put("/api/v1/employees/:id", (req, res) => {
  const sql =
    "update employees set `name` = ?,`department` = ?,`salary` = ?,`gender` = ?,`dob` = ? where ID = ?";
  const values = [
    req.body.name,
    req.body.department,
    req.body.salary,
    req.body.gender,
    req.body.dob,
  ];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
});
app.delete("/api/v1/employees/:id", (req, res) => {
  const sql = "DELETE FROM employees WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
});

app.post("/reguser", async (req, res) => {
  const sql = "INSERT INTO emp_login (`name`,`email`,`password`) VALUES (?)";

  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
});
app.post("/emp_login", (req, res) => {
  const sql = "SELECT * FROM emp_login WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }

    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});
app.post("/EditEmployee", (req, res) => {
  const sql = "INSERT INTO employees(`image`)VALUES(?)";
  const values = [req.body.image];
  db.query(sql, [values], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
});

app.listen(8080, () => {
  console.log("listening");
});
