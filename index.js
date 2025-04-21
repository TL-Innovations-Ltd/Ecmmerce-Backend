const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/connection');
const userRoutes = require('./client/user/routes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

app.use('/client/user', userRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

