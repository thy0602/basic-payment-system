const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const port = 3000;
const app = express();

const hbs = exphbs.create({
  defaultLayout: "mainLayout",
  extname: "hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// app.use('/account', require('./controllers/accountController'));
// app.use('/transaction', require('./controllers/transactionRecordController'));

app.get("/", (req, res) => {
  res.render("home", {
    cssP: () => "css",
    scriptP: () => "scripts",
    navP: () => "nav",
    footerP: () => "footer",
    title: "Home"
  });
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
