import { Request, Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middlewares/authMiddleware';


export const getProfile = async (
req: AuthRequest,
res: Response
): Promise<void> => {

try{

const user = await User.findById(
req.user?.id
).select('-password');

res.status(200).json(user);

}
catch(err:any){

res.status(500).json({
message: err.message
});

}

};


export const getAllUsers = async (
req: Request,
res: Response
): Promise<void> => {

try{

const users = await User.find()
.select('-password');

res.status(200).json(users);

}
catch(err:any){

res.status(500).json({
message: err.message
});

}

};


export const deleteUser = async(
req:Request,
res:Response
):Promise<void>=>{

try{

const user = await User.findByIdAndDelete(
req.params.id
);

if(!user){

res.status(404).json({
message:"User not found"
});

return;
}

res.status(200).json({
message:"User deleted successfully"
});

}
catch(err:any){

res.status(500).json({
message:err.message
});

}

};


export const updateStatus = async(
req:Request,
res:Response
):Promise<void>=>{

try{

const {status}=req.body;

const user=await User.findByIdAndUpdate(
req.params.id,
{status},
{new:true}
);

res.status(200).json(user);

}
catch(err:any){

res.status(500).json({
message:err.message
});

}

};