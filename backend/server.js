//* Importing Packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const axios = require('axios');


const connectDB = require("./DB/Connection");

const app = express();

const port = process.env.PORT || 5000;

const User = require("./Models/UserModel");

const userRegisterRoute = require("./Routers/UserRoutes/RegesterRoute");
const userLoginRoute = require("./Routers/UserRoutes/LoginRoute");
const userLogoutRoute = require("./Routers/UserRoutes/LogoutRoute");


app.use(express.json());
app.use(cors());

app.use("", userRegisterRoute);

app.use("", userLoginRoute);

app.use("", userLogoutRoute);

connectDB();
app.listen(port, () => {
  console.log(`\nServer is running on port: ${port}`);
});
