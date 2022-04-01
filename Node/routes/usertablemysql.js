var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
const jwt = require("jsonwebtoken");
router.get("/createtable", function (req, res) {
  const sql =
    "CREATE TABLE user(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(30), password VARCHAR(200))";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/", (req, res) => {
  const sql = "SELECT * FROM user";
  connector.query(sql, (err, results, fields) => {
    if (err) {
      res.json({ err });
    } else {
      res.json({ results });
    }
  });
});
router.post("/", (req, res) => {
  const { id, username, password } = req.body;
  const checkingsql = `SELECT * FROM user WHERE username =?`;
  connector.query(checkingsql, [username], (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      if (results.length > 0) {
        res.json({ status: 0, data: "username already exists" });
      } else {
        const sql = "INSERT INTO user VALUES(?,?,?)";
        connector.query(
          sql,
          [id, username, password],
          function (err, results, fields) {
            if (err) {
              res.json(err);
            } else {
              res.json({ status: 1, data: "user created" });
            }
          }
        );
      }
    }
  });
});
router.get("/checklogin/:username/:password", (req, res) => {
  const { username, password } = req.params;
  const sql = "SELECT * FROM user";
  connector.query(sql, (err, results) => {
    let flag = false;
    results.forEach((user) => {
      if (user.username === username && user.password === password) {
        flag = true;
      }
    });
    if (flag) {
      const payload = {
        user: {
          username: username,
          password: password,
        },
      };
      jwt.sign(payload, "secret_string", { expiresIn: 1200 }, (err, token) => {
        if (err) {
          throw err;
          res.json({ status: 0, debug_data: "Temporary error in backend" });
        }
        res.json({ token });
      });
    } else res.json({ status: 1, debug_data: "User doesnot logged in" });
  });
});
module.exports = router;
