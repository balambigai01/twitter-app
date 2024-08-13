import mongoose from 'mongoose'
const connectMongoDB= async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        
        console.log(`mongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error Connecting to mongodb:${error.message}`)
        process.exit(1)
    }
}
export default connectMongoDB