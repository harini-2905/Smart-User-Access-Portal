import User from '../models/User';
import AccessRequest from '../models/accessRequest';

export const getStats=async()=>{

const totalUsers=
await User.countDocuments();

const activeUsers=
await User.countDocuments({

status:'active'

});

const pendingRequests=
await AccessRequest.countDocuments({

status:'Pending'

});

return{

totalUsers,
activeUsers,
pendingRequests

};

};