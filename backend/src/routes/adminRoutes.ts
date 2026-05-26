import express from "express";

import {
    getAllUsers,
    deactivateUser
} from "../controllers/adminController";

import { authenticate } from "../middlewares/authMiddleware";

import { isAdmin } from "../middlewares/adminMiddleware";

const router = express.Router();

router.get(
    "/users",
    authenticate,
    isAdmin,
    getAllUsers
);

router.put(
    "/deactivate/:id",
    authenticate,
    isAdmin,
    deactivateUser
);

export default router;