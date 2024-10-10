import { Server } from "socket.io";
import { verifySocketToken } from "./socketAuth";
import { steamAuthHandlers } from "@api/steam/auth/sockets/steamAuthHandlers";

export const socketServer = (io: Server) => {

    // Middleware для проверки токена
    io.use(verifySocketToken);

    // Подключаем обработчики событий для сокетов
    io.on('connection', (socket) => {
        console.log('Пользователь подключен', socket.id);

        // Подключаем обработчики для Steam авторизации
        steamAuthHandlers(socket);

        socket.on('disconnect', () => {
            console.log('Пользователь отключен', socket.id);
        });
    });

}