import { Response } from 'express';
import AccessRequest from '../models/accessRequest';
import { AuthRequest } from '../middlewares/authMiddleware';


export const createRequest = async(
req:AuthRequest,
res:Response
):Promise<void>=>{

try{

const {resource,reason}=req.body;

const request=new AccessRequest({

userId:req.user?.userId,
resource,
reason

});

await request.save();

res.status(201).json({

message:"Access request created",
request

});

}
catch(err:any){

res.status(500).json({

message:err.message

});

}

};



export const getAllRequests = async(
req:AuthRequest,
res:Response
):Promise<void>=>{

try{

const requests=await AccessRequest.find();

res.status(200).json(requests);

}
catch(err:any){

res.status(500).json({

message:err.message

});

}

};



export const approveRequest=async(
req:AuthRequest,
res:Response
):Promise<void>=>{

try{

const request=await AccessRequest.findByIdAndUpdate(

req.params.id,
{status:'Approved'},
{new:true}

);

if(!request){

res.status(404).json({
message:"Request not found"
});

return;
}

res.status(200).json({

message:"Request approved",
request

});

}
catch(err:any){

res.status(500).json({

message:err.message

});

}

};



export const rejectRequest=async(
req:AuthRequest,
res:Response
):Promise<void>=>{

try{

const request=await AccessRequest.findByIdAndUpdate(

req.params.id,
{status:'Rejected'},
{new:true}

);

if(!request){

res.status(404).json({
message:"Request not found"
});

return;
}

res.status(200).json({

message:"Request rejected",
request

});

}
catch(err:any){

res.status(500).json({

message:err.message

});

}

};