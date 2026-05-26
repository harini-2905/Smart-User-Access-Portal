import { Request, Response } from "express";
import Record from "../models/record";

export const getAllRecords = async(
req:Request,
res:Response
):Promise<void>=>{

try{

const records=await Record.find();

res.json(records);

}
catch(err:any){

res.status(500).json({
message:err.message
});

}

};



export const getRecordByUser=async(
req:Request,
res:Response
):Promise<void>=>{

try{

const records=await Record.find({

userId:req.params.userId

});

res.json(records);

}
catch(err:any){

res.status(500).json({
message:err.message
});

}

};