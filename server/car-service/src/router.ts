// Auth
import AuthRoutes from "./routes/car/car.route";

import { Request, Response } from "express";
import express from "express";
const router = express.Router();

router.get("/health-check", (req: Request, res: Response) => {
  console.log("Server is running");
  res.send("Server is running");
});

router.use("/car", AuthRoutes);

export default router;