// Developer: Suzair - Backend Developer
const { execSync } = require('child_process');

// Function to get current git branch
function getCurrentBranch() {
    try {
        return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    } catch (error) {
        console.warn('⚠️ Could not determine git branch, falling back to NODE_ENV');
        return null;
    }
}

const envPath = getCurrentBranch() === 'dev' ? '.env.dev' : '.env';
console.log(`🔧 Loading environment from: ${envPath === '.env.dev' ? 'development' : 'production'} `);
require('dotenv').config({ path: envPath });


const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./src/utils/connection");
const userRoutes = require("./src/client/user/routes");
const productRoutes = require("./src/admin/products/routes");
const cartRoutes = require("./src/client/cart/routes");
const categoryRoutes = require("./src/admin/category/routes");
const orderRoutes = require("./src/client/order/routes");
const slideshowsRoutes = require("./src/admin/slides_show/routes");
const swaggerSpec = require("./swagger");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB();

//Dev Testing

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/uploads', express.static('uploads'));

app.use("/test", (req, res) => {
  res.status(200).json({ message: "Ecommerce Backend Deployed Successfully", port: process.env.PORT });
});

app.use("/client/user", userRoutes);
app.use("/admin/products", productRoutes);
app.use("/client/cart", cartRoutes);
app.use("/admin/category", categoryRoutes);
app.use("/client/order", orderRoutes);
app.use("/admin/slide", slideshowsRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
