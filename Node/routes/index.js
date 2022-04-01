var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(
    "<style>div{background: lightseagreen; padding:5px}h1{color:darkblue; text-align:center;}</style><div><h1>Welcome to index home page</h1></div>"
  );
});
router.get("/students", function (req, res, next) {
  let students = ["Bindu", "Tulasi", "Mulaz"];
  res.send(students);
});
router.get("/student", function (req, res, next) {
  let tulasiOb = { name: "Tulasi", city: "Hyderabad" };
  res.send(tulasiOb);
});

module.exports = router;
