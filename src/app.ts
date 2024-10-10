import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from '@utils/db';
import authRoutes from '@api/user/auth/routes/authRoutes';
import authSteamRoutes from '@api/steam/auth/routes/authSteamRoutes';
import { socketServer } from '@utils/socketServer';

dotenv.config();

// Создаем приложение Express
const app = express();

// Создаем HTTP-сервер на основе приложения Express
const httpServer = http.createServer(app);

// Инициализируем WebSocket-сервер поверх HTTP-сервера
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Разрешить любые источники
  },
});

socketServer(io)

// Подключаемся к базе данных
connectDB()

app.use(express.json());
app.use(cors());

// Роуты Express
app.use('/api/user/auth', authRoutes);
app.use('/api/steam/auth', authSteamRoutes);

// Запускаем сервер sockets
const PORT_SERVER = process.env.PORT_SERVER ? +process.env.PORT_SERVER : 8080;
httpServer.listen(PORT_SERVER, '192.168.141.11', () => {
  // Синхронизируем модели с базой данных
  // sequelize.sync().then(() => {
  //   console.log('Tables synced');
  // });
  console.log(`Сервер запущен на порту ${PORT_SERVER}`)
});