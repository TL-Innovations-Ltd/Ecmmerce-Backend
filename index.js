const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/connection');
const userRoutes = require('./client/user/routes');
const productRoutes = require('./admin/products/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDB();

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/client/user', userRoutes);
app.use('/admin/products', productRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
