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
require("dotenv").config();

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

//hello suzair

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
