/**
 * Промежуточное программное обеспечение, которое проверяет токен JWT в заголовке запроса "Авторизация".
 * Если токен действителен, оно добавляет расшифрованную информацию о пользователе к объекту запроса.
 * Если токен отсутствует или недействителен, оно возвращает неавторизованный ответ 401.
 *
 * @param {Request} req - Объект экспресс-запроса.
 * @param {Response} res - объект экспресс-ответа.
 * @param {NextFunction} next - Следующая функция промежуточного программного обеспечения в стеке.
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};