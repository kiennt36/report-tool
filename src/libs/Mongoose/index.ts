import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI ?? "";

mongoose.connect(mongodbUri).then(() => console.log("Connected to MongoDB"));
