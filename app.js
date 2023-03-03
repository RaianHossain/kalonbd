//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const router = express.Router();

//internal imports
const {notFoundHanlder, errorHandler} = require("./midlewares/common/errorHanlder");
const inboxRouter = require("./router/inboxRouter");
const decorateHTMLResponse = require('./midlewares/common/decorateHTMLResponse');
const loginRouter = require("./router/admin/loginRouter");
const usersRouter = require("./router/admin/usersRouter");
const dashboardRouter = require("./router/admin/dashboardRouter");
const categoryRouter = require("./router/admin/categoryRouter");
const brandRouter = require("./router/admin/brandRouter");
const deliveryDateRouter = require("./router/admin/deliveryDateRouter");

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
app.use('/admin/categories', decorateHTMLResponse('Category'), categoryRouter)
app.use('/admin/brands', decorateHTMLResponse('Brand'), brandRouter)
app.use('/admin/delivery-dates', decorateHTMLResponse('DeliveryDate'), deliveryDateRouter)


//404 error handler
app.use(notFoundHanlder);

//default error hanlder
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
})