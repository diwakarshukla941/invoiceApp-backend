import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
dotenv.config();



const app = express();

// middlewares

app.use(cors());
app.use(express.json());

// routes

app.use('/api/auth', authRoutes);
app.use('/api/invoice',invoiceRoutes )


// mongodb connection 

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`db connected suceessfully`);
     app.listen(process.env.PORT, () => console.log(`🚀 Server running on http://localhost:${process.env.PORT}`));
})
.catch(()=>{
    console.log(`something went wrong`);
})