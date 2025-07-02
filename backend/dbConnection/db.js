import mongoose from "mongoose";

const dbConnect = async (url)=>{
    try {
        console.log("db connected")
        return mongoose.connect(url);
    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect;