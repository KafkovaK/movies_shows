import express from 'express';
import {getAllUsers, getUserId, loginUser, registerUser, updateUser, deleteUser} from "./usersController.js";

const router = express.Router();

router.get('/', getAllUsers);
router.get("/:id", getUserId);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;