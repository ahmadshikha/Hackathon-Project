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
const eventRouter = require('./Routers/EventRoutes/eventRouter');


app.use(express.json());
app.use(cors());

app.use("", userRegisterRoute);

app.use("", userLoginRoute);

app.use("", userLogoutRoute);

app.use('/events', eventRouter);

// app.get('/api/templates', async (req, res) => {
//   try {
//     const CLIENT_ID = 'OC-AZB45DyjSCFE'; // Replace with your Canva client ID
//     const url = 'https://api.canva.com/v1/templates';

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${CLIENT_ID}`,
//         // 'Content-Type': 'application/json', // Might not be necessary for GET requests
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching templates from Canva:', error.message);
//     res.status(500).json({ error: 'Failed to fetch templates from Canva' });
//   }
// });

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
