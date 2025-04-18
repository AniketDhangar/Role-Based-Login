import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "unauthrized: no token" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 

    const user = await User.findById(decoded._id);
  
    if (!user) {
      return res.status(403).json({ message: " no user found" });
    }
    if(user.role !== 'admin'){
        return res.status(403).json({ message: "unauthrized: this is not admin." });

    }
    // console.log(token);
    // console.log(user);
    // console.log(decoded);
    next()
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"error in  check admin",error})
  }
};

export default isAdmin;
