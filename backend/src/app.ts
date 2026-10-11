import express from "express";
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";
import orderRoutes from "./routes/order.route";
import chatRoutes from "./routes/chat.route";
import reviewRoutes from "./routes/review.route";
import wishlistRoutes from './routes/wishlist.route'
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes)
export default app;
