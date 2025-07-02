import CarRoutes from "./routes/car/car.route";
import CategoryRoutes from "./routes/car/category.route";
import WishlistRoutes from "./routes/car/wishlist.route";
import OrdertRoutes from "./routes/car/order.route";
import express, { Request, Response } from "express";
const router = express.Router();

router.get("/health-check", (req: Request, res: Response) => {
  console.log("Server is running");
  res.send("Server is running");
});

router.use("/cars", CarRoutes);
router.use("/categories", CategoryRoutes);
router.use("/wishlists", WishlistRoutes);
router.use("/orders", OrdertRoutes);

export default router;
