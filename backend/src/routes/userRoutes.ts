import { Router } from 'express';

import {
    getProfile,
    getAllUsers,
    deleteUser,
    updateStatus
}
from '../controllers/userController';

import { authenticate }
from '../middlewares/authMiddleware';

import { isAdmin }
from '../middlewares/adminMiddleware';

const router = Router();

router.get(
    '/profile',
    authenticate,
    getProfile
);

router.get(
    '/all',
    authenticate,
    isAdmin,
    getAllUsers
);

router.delete(
    '/:id',
    authenticate,
    isAdmin,
    deleteUser
);

router.put(
    '/status/:id',
    authenticate,
    isAdmin,
    updateStatus
);

export default router;