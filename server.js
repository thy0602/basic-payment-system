const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
let moneyFormatter = require('./utils/moneyFormatter');

//handle https
const fs = require("fs");
var https = require('https');

const port = 3000;
const app = express();

const hbs = exphbs.create({
  defaultLayout: "mainLayout",
  extname: "hbs",
  helpers: {
    sum: (a, b) => a + b,
    formatMoney: function (money) {
      return moneyFormatter.moneyFormatter(money);
    },
    formatDatetime: function (time) {
      return time.getDay().toString() + '/' +
        (time.getMonth() + 1).toString() + '/' +
        time.getFullYear().toString() + ' '
        + String(time.getHours()).padStart(2, '0') + ":" + 
        String(time.getMinutes()).padStart(2, '0') + ':' +
        String(time.getSeconds()).padStart(2, '0');
    }
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
app.use('/api/account',require('./api/accountApi'));

app.get("/", (req, res) => {
  if (!req.cookies.user)
    return res.redirect('/login-id');
  res.redirect('/home');
});

var privateKey  = fs.readFileSync(__dirname+'/key/CA/localhost/localhost.decrypted.key');
var certificate = fs.readFileSync(__dirname+'/key/CA/localhost/localhost.crt');

var options = {
  key: privateKey,
  cert: certificate
};

var server = https.createServer(options, app);
server.listen(port, function () {
  console.log('HTTPS Express server is up on port ' + port);
});
