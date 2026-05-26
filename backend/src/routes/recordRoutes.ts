import { Router } from "express";

import {
    getAllRecords,
    getRecordByUser
}
from "../controllers/recordController";

import { authenticate }
from "../middlewares/authMiddleware";

const router = Router();

router.get(
    "/",
    authenticate,
    getAllRecords
);

router.get(
    "/:userId",
    authenticate,
    getRecordByUser
);

export default router;