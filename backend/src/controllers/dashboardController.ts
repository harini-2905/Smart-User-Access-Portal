import { Request, Response } from 'express';
import User from '../models/User';
import AccessRequest from '../models/accessRequest';

export const getDashboardStats = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const totalUsers =
            await User.countDocuments();

        const activeUsers =
            await User.countDocuments({
                status: 'active'
            });

        const inactiveUsers =
            await User.countDocuments({
                status: 'inactive'
            });

        const pendingRequests =
            await AccessRequest.countDocuments({
                status: 'Pending'
            });

        const approvedRequests =
            await AccessRequest.countDocuments({
                status: 'Approved'
            });

        const rejectedRequests =
            await AccessRequest.countDocuments({
                status: 'Rejected'
            });

        res.status(200).json({

            totalUsers,
            activeUsers,
            inactiveUsers,
            pendingRequests,
            approvedRequests,
            rejectedRequests

        });

    }
    catch (err: any) {

        res.status(500).json({

            message: err.message

        });

    }

};