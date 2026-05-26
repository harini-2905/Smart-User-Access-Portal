import User from '../models/User';

export const findUserByEmail=async(

email:string

)=>{

return await User.findOne({

email

});

};