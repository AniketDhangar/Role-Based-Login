import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL);
console.log("connected successfully with :", connect.connection.name);  
} catch (error) {
    console.log("error in connection to Database", error);
  }
};

export default connectToDB;
