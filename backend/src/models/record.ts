import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },

    recordName:{
        type:String,
        required:true
    },

    accessLevel:{
        type:String,
        required:true
    }

});

export default mongoose.model(
    "Record",
    recordSchema,
    "records"
);