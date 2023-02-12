//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const {notFoundHanlder, errorHandler} = require("./midlewares/common/errorHanlder");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
const dashboardRouter = require("./router/admin-dashboard/dashboardRouter");
const decorateHTMLResponse = require('./midlewares/common/decorateHTMLResponse');

const app = express();
dotenv.config();

//database connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("Database connection successful"))
.catch(err => console.log(err));

//request parse
app.use(express.json());
app.use(express.urlencoded({extend: true}));

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup - Admin Dashboard
app.use('/login', decorateHTMLResponse('Login'), loginRouter);
app.use('/users', decorateHTMLResponse('Users'), usersRouter);
app.use('/inbox', decorateHTMLResponse('Inbox'), inboxRouter);
app.use('/admin', decorateHTMLResponse('Dashboard'), dashboardRouter);

//404 error handler
app.use(notFoundHanlder);

//default error hanlder
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
})