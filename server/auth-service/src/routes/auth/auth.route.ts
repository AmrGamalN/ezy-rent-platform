import express from "express";
import LoginRoutes from "./login.route";
import RegisterRoutes from "./register.route";
import SecurityRoutes from "./security.route";
import { LoginController } from "../../controllers/auth/login.controller";
import { userAuthorization } from "../../utils/authorization.util";
import { HandleError } from "common";
const { handleError } = HandleError.getInstance();
const controller = LoginController.getInstance();
const router = express.Router();
router.use("/", LoginRoutes);
router.use("/", RegisterRoutes);
router.use("/", SecurityRoutes);

/**
 *  @swagger
 *  /auth/logout:
 *    post:
 *      summary: Logout
 *      tags: [Login]
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          $ref: '#/components/responses/SuccessResponse'
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal Server Error
 */
router.post(
  "/logout",
  userAuthorization,
  handleError(controller.logout.bind(controller))
);

export default router;
