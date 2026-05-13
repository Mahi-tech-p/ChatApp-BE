import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("1st")
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo Db connection established ${connect.connection.host}`)
    } catch (error) {
        console.log("MonogDb connnection failed")
        process.exit(1)
    }
}