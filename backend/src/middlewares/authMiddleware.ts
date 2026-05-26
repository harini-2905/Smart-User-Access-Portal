import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id:string;
    userId:string;
    role:string;
}

export interface AuthRequest extends Request{
    user?:JwtPayload
}

export const authenticate=(req:AuthRequest,res:Response,next:NextFunction)=>{

    try{

        const token=req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({
                message:"No token found"
            });
        }

        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET || "mysecretkey"
        ) as JwtPayload;

        req.user=decoded;

        next();

    }
    catch(err){

        return res.status(401).json({
            message:"Invalid token"
        });

    }
}