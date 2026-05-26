import { Router } from 'express';

import {

createRequest,
getAllRequests,
approveRequest,
rejectRequest

} from '../controllers/accessRequestController';

import { authenticate } from '../middlewares/authMiddleware';

import { isAdmin } from '../middlewares/adminMiddleware';

const router=Router();


router.post(
'/create',
authenticate,
createRequest
);


router.get(
'/all',
authenticate,
isAdmin,
getAllRequests
);


router.put(
'/approve/:id',
authenticate,
isAdmin,
approveRequest
);


router.put(
'/reject/:id',
authenticate,
isAdmin,
rejectRequest
);

export default router;