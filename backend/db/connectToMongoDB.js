import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`database connected`);
    }catch(error){
        console.log(error ,`database not connected`);
    }
}

export default connectDB ;