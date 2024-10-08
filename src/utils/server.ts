/**
 * Инициализирует HTTP-сервер и сокет.Сервер ввода-вывода для приложения.
 *
* Сервер прослушивает входящие соединения на указанном порту (или 5000, если он не задан).
 * Для аутентификации подключений к сокетам используется промежуточное программное обеспечение verifySocketToken.
 * Когда клиент подключается, регистрируются "steamAuthHandlers" для обработки событий, связанных с аутентификацией Steam.
 * Когда клиент отключается, на консоль выводится соответствующее сообщение.
 */
import { steamAuthHandlers } from '@api/steam/auth/sockets/steamAuthHandlers';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { verifySocketToken } from './socketAuth';

import app from 'app';

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*', // Разрешить кросс-доменные запросы с клиента
    },
});

io.use(verifySocketToken);

io.on('connection', (socket) => {
    console.log('Пользователь подключен', socket.id);

    // Подключаем обработчики сокетов
    steamAuthHandlers(socket);

    socket.on('disconnect', () => {
        console.log('Пользователь отключен', socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});