import express, { json } from "express";
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: ['https://note-taking-frontend-eta.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(json());

app.get('/', (req, res) => {
    res.send("Welcome to the Note Taking App!");
});

import userRoutes from './routes/userRoute.js';  
import noteRoutes from './routes/noteRoute.js';  

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});

connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("Error occurred while connecting to MongoDB:", error));
