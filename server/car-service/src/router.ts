import CarRoutes from "./routes/car/car.route";
import CategoryRoutes from "./routes/car/category.route";

import { Request, Response } from "express";
import express from "express";
const router = express.Router();

router.get("/health-check", (req: Request, res: Response) => {
  console.log("Server is running");
  res.send("Server is running");
});

router.use("/car", CarRoutes);
router.use("/category", CategoryRoutes);
export default router;
