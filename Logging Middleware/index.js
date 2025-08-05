// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(express.json());
app.use('/', urlRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
