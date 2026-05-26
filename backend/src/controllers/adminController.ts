import { Request, Response } from "express";
import User from "../models/User";

export const getAllUsers = async (
req: Request,
res: Response
): Promise<void> => {

try {

const users = await User.find().select("-password");

res.status(200).json(users);

}
catch(err:any){

res.status(500).json({
message:err.message
});

}

};



export const deactivateUser = async(
req:Request,
res:Response
):Promise<void>=>{

try{

const user=await User.findById(req.params.id);

if(!user){

res.status(404).json({
message:"User not found"
});

return;

}

user.status="inactive";

await user.save();

res.status(200).json({

message:"User deactivated successfully",
user

});

}
catch(err:any){

res.status(500).json({

message:err.message

});

}

};