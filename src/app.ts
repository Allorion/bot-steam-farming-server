import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, sequelize } from '@utils/db';
import authRoutes from '@api/user/auth/routes/authRoutes';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(cors())

app.use('/api/user/auth', authRoutes);

// Синхронизируем модели с базой данных
sequelize.sync().then(() => {
  console.log('Tables synced');
});

const HOST_NAME = 'localhost';
const port = 8080;

app.listen(port, HOST_NAME, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

export default app;