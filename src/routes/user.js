import { Router } from "express";

import {
  signIn,
  signOut,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/signin", signIn);
router.post("/signout", signOut);


export default router;
