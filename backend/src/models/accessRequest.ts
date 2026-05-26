import mongoose, { Document, Schema } from 'mongoose';

export interface IAccessRequest extends Document {

    userId: string;
    resource: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';

}

const AccessRequestSchema = new Schema<IAccessRequest>(
{
    userId: {
        type: String,
        required: true
    },

    resource: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending','Approved','Rejected'],
        default:'Pending'
    }

},
{
    timestamps:true
}
);

export default mongoose.model<IAccessRequest>(
    'AccessRequest',
    AccessRequestSchema
);