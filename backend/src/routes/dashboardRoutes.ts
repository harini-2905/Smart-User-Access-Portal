import { Router } from 'express';

import {

getDashboardStats

}

from '../controllers/dashboardController';

import {

authenticate

}

from '../middlewares/authMiddleware';

import {

isAdmin

}

from '../middlewares/adminMiddleware';

const router=Router();

router.get(

'/stats',
authenticate,
isAdmin,
getDashboardStats

);

export default router;