const express= require("express");
const router= express.Router();
const {getUsers, deleteUsers}= require("../controllers/ManageUsers");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/users",authMiddleware,adminMiddleware,getUsers);
router.delete("/users/:id",authMiddleware,adminMiddleware,deleteUsers);

module.exports=router;
