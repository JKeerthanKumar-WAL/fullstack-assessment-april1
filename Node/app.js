var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//We are including mongoose in the program using require
/* const mongoose = require("mongoose"); */

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
/* var usersRouter = require("./routes/usertable"); */
var productsRouter = require("./routes/products");
var todosRouter = require("./routes/todos");
var forumsRouter = require("./routes/forums");
var hobbiesRouter = require("./routes/hobbies");
var twitterRouter = require("./routes/twitter");
var forumRouter = require("./routes/forum");
var authorRouter = require("./routes/author");
var bookRouter = require("./routes/book");
var categoryRouter = require("./routes/category");
var productRouter = require("./routes/product");
var userRouter = require("./routes/user");
var usernameRouter = require("./routes/username");
var mysqlRouter = require("./routes/mysql");
var todomysqlRouter = require("./routes/todomysql");
var authormysqlRouter = require("./routes/authormysql");
var usermysqlRouter = require("./routes/usermysql");
var cookieRouter = require("./routes/cookie");
var citycookieRouter = require("./routes/citycookie");
var detailcookieRouter = require("./routes/detailcookie");
var dishesRouter = require("./routes/dishes");
var carRouter = require("./routes/car");
var sessionRouter = require("./routes/session");
var usertableRouter = require("./routes/usertable");
var userdetailsRouter = require("./routes/userdetails");
var fileRouter = require("./routes/file");
var createfileRouter = require("./routes/createfile");
var createfolderRouter = require("./routes/createfolder");
var foldercontentsRouter = require("./routes/foldercontents");
var modifyfileRouter = require("./routes/modifyfile");
var uploadsRouter = require("./routes/uploads");
var userregistrationRouter = require("./routes/userregistration");
var usertablemysqlRouter = require("./routes/usertablemysql");

var app = express();
app.use(
  session({
    secret: "session_secret_key",
    resave: true,
    saveUnintialized: true,
    cookie: {
      secure: false,
    },
  })
);
//We are defining a connection string to connect to the mongodb
/* let mongoConnUrl = "mongodb://localhost/westsidenode";
//We are connecting the mongodb
mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
//We are getting the connection pointer
let db = mongoose.connection;
//We are now adding error event and it will run if there is any error in connecting to mongodb
db.on("error", function (error) {
  console.log("unable to connect");
  console.log(error);
});
//We are adding open event and responding in the call back function if connection is successful
db.on("open", function () {
  console.log("we are connected to the mongodb server via mongoose");
});
 */
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/todos", todosRouter);
app.use("/forums", forumsRouter);
app.use("/hobbies", hobbiesRouter);
app.use("/twitter", twitterRouter);
app.use("/forum", forumRouter);
app.use("/author", authorRouter);
app.use("/book", bookRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/username", usernameRouter);
app.use("/mysql", mysqlRouter);
app.use("/todomysql", todomysqlRouter);
app.use("/authormysql", authormysqlRouter);
app.use("/usermysql", usermysqlRouter);
app.use("/cookie", cookieRouter);
app.use("/citycookie", citycookieRouter);
app.use("/detailcookie", detailcookieRouter);
app.use("/dishes", dishesRouter);
app.use("/car", carRouter);
app.use("/session", sessionRouter);
app.use("/usertable", usertableRouter);
app.use("/userdetails", userdetailsRouter);
app.use("/file", fileRouter);
app.use("/createfile", createfileRouter);
app.use("/createfolder", createfolderRouter);
app.use("/foldercontents", foldercontentsRouter);
app.use("/modifyfile", modifyfileRouter);
app.use("/uploads", uploadsRouter);
app.use("/userregistration", userregistrationRouter);
app.use("/usertablemysql", usertablemysqlRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
