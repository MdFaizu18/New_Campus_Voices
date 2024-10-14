import { Router } from "express";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

const router = Router();

import { changePassword, getCurrentUser, getUserById, updateUser } from "../controllers/userController.js";

router.use(authenticateUser);

router.get("/",authenticateUser, getCurrentUser);
// router.patch('/', changePassword);
router.route("/:id").patch(updateUser, changePassword);
router.patch("/user/:id",getUserById);

export default router;