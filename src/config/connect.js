import mongoose, { connect } from "mongoose";


export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}