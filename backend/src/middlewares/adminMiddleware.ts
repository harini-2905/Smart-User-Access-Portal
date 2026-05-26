import { Request, Response, NextFunction } from "express";

export const isAdmin = (
    req: any,
    res: Response,
    next: NextFunction
): void => {

    if (!req.user) {

        res.status(401).json({
            message: "Unauthorized"
        });

        return;
    }

    if (req.user.role !== "Admin") {

        res.status(403).json({
            message: "Admin access required"
        });

        return;
    }

    next();
};