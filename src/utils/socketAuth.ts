/**
 * Проверяет токен авторизации сокетного соединения и присоединяет расшифрованные пользовательские данные к объекту socket.
 *
 * @param socket - сокетное соединение, которое необходимо проверить.
 * @param next - функция обратного вызова, которая будет выполнена после проверки.
 * @throws {Error} Если токен отсутствует или недействителен.
 */

import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

export const verifySocketToken = (socket: Socket, next: (err?: any) => void) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Ошибка авторизации'));
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) {
            return next(new Error('Недействительный токен'));
        }

        // Токен валиден, сохраняем данные пользователя
        socket.data.user = decoded;
        next(); // Разрешаем подключение
    });
};