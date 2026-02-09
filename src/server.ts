import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { error } from "node:console";

dotenv.config();

const PORT = process.env.PORT || "5001";
const MONGO_URI = process.env.MONGO_URI || "no-mongo-uri";

mongoose.connect(MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
        console.log(`Server is Running on Port ${PORT}`);
    });
}). catch ((error)=> console.error("Error conecting to MangoDB", error));