const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const port = 3000;
const app = express();

const hbs = exphbs.create({
  defaultLayout: "mainLayout",
  extname: "hbs",
  helpers: {
    sum: (a, b) => a + b
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//passport
require('./middlewares/session')(app);
//passport
require('./middlewares/passport')(app);

app.use('/login', require('./controllers/LoginController'));
app.use('/account', require('./controllers/accountController'));
app.use('/admin', require('./controllers/adminController'));
app.use('/transaction', require('./controllers/transactionRecordController'));

//api
app.use("/api/transaction", require('./api/paymentApi'))

//api
app.use('/api/transaction',require('./api/paymentApi'));

app.get("/", (req, res) => {
  res.render("home", {
    cssP: () => "css",
    scriptP: () => "scripts",
    navP: () => "nav",
    footerP: () => "footer",
    title: "Home",
    isHome: 1
  });
});

app.get("/user_home", (req, res) => {
  res.render("user_home", {
    cssP: () => "css",
    scriptP: () => "scripts",
    navP: () => "nav",
    footerP: () => "footer",
    title: "Home",
  });
});

app.get("/user_list", (req, res) => {
  res.render("user_list", {
    cssP: () => "css",
    scriptP: () => "scripts",
    navP: () => "nav",
    footerP: () => "footer",
    title: "User List",
    isUserList: 1
  });
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
