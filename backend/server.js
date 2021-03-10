const express = require('express')
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const appRouter = require('./router/appRouter');
const orderRouter = require('./router/orderRouter');
const resRouter = require('./router/resRouter')
const port = process.env.PORT || 3000;
const url = 'mongodb+srv://user1:user1@cluster0.hmsuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
mongoose.connect(url, {useNewUrlParser: true}, { useUnifiedTopology: true });

var passport = require('passport');
var session = require('express-session');
app.use(session({
        name: 'kb',
        resave: false,
        saveUninitialized: false,
        secret: 'secret',
        cookie: {
            maxAge: 360000,
            httpOnly: false,
            secure: false
        }
    }
));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());


const server = http.createServer(app);

app.use(cors({
    origin:['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/reg', appRouter);
app.use('/order', orderRouter);
app.use('/restaurant', resRouter);

server.listen(port, ()=> {
    console.log("server listen "+port);
})