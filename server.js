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

app.use('/', require('./controllers/homeController'));
app.use('/login', require('./controllers/LoginController'));
app.use('/account', require('./controllers/accountController'));
app.use('/transaction', require('./controllers/transactionRecordController'));

//api
app.use('/api/transaction',require('./api/paymentApi'));

app.get("/", (req, res) => {
  if (!req.cookies.user)
    return res.redirect('/login-id');
  res.redirect('/home');
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
