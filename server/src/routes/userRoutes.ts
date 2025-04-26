import express from "express";
import { register, getUsers, updateUser, deleteUser } from "../controllers/userController";

const router = express.Router();

router.post("/register", register);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;