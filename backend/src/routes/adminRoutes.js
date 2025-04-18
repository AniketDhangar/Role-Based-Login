import express from 'express';
import { deleteUser, getAllUser, updateUser } from '../controllers/userController.js';
import isAdmin from '../middleware/checkAdmin.js';


//admin routes
let adminRouter = express.Router();
adminRouter.get('/getusers',isAdmin,getAllUser)
adminRouter.delete('/deleteuser',isAdmin,deleteUser)
adminRouter.put('/updateuser',isAdmin,updateUser)   


export default adminRouter;