const User=require("../models/AuthModel");
const logger= require("../utils/logger");


async function invalidateCache(req){
    try {
    const cachKey="usersList";
    await req.redisClient.del(cachKey);
        logger.info("Cache invalidated for user list");    
    } catch (error) {
        logger.error("Error invalidating cache:", error);
        throw new Error("Cache invalidation failed");
    }
}

const getUsers=async(req,res)=>{
    try{
      const cachKey="usersList";
      const cachedUsers=await req.redisClient.get(cachKey);

      if(cachedUsers){
        logger.info("Returning cached users");
        return res.status(200).json({
            success:true,
            message:"Users fetched successfully from cache",
            users:JSON.parse(cachedUsers)
        })
    }
       const users = await User.find({ role: { $ne: "admin" } }).select("-password");
        if(users.length===0){
            return res.status(404).json({
                success:false,
                message:"No users found"
            });        
        }else{
            // Store users in cache
            await req.redisClient.setex(cachKey,300,JSON.stringify(users));
            logger.info("Users fetched from database and cached");
            return res.status(200).json({
                success:true,
                message:"Users fetched successfully",
                users:users
            });
        }
    }catch(err){
        logger.error("Error fetching users:", err);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}


const deleteUsers=async(req,res)=>{
    try{
        const getCurrentId=req.params.id;
        const deletedUser=await User.findByIdAndDelete(getCurrentId);
        if(!deletedUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }else{
            // Invalidate cache after deletion
            await invalidateCache(req);
            logger.info('also invalidating cache after user deletion');
            return res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        }
    }catch(error){
        logger.error("Error deleting user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports={getUsers, deleteUsers};