import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import accessRequestRoutes from './routes/accessRequestRoutes';
import adminRoutes from './routes/adminRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import recordRoutes from './routes/recordRoutes';


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/records',recordRoutes);

app.use('/api/request',accessRequestRoutes);

app.use('/api/admin',adminRoutes);

app.use(

'/api/dashboard',
dashboardRoutes

);

app.get('/', (req, res) => {
    res.send("Backend running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});