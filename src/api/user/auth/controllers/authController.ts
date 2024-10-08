import { Request, Response } from 'express';
import { register, login } from '../services/authService';

/**
 * Регистрирует нового пользователя с указанными именем пользователя и паролем и возвращает токен JWT.
 *
 * @param req - объект экспресс-запроса, содержащий имя пользователя и пароль в теле запроса.
 * @param res - объект Express response, который будет использоваться для отправки токена JWT обратно клиенту.
 * @returns обещание, которое преобразуется в токен JWT.
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { user_name, password } = req.body;
        const token = await register(user_name, password);
        res.status(201).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Произошла неизвестная ошибка' });
        }
    }
};

/**
 * Авторизовывает существующего пользователя с указанными именем пользователя и паролем и возвращает токен JWT.
 *
 * @param req - Объект экспресс-запроса, содержащий имя пользователя и пароль в теле запроса.
 * @param res - объект Express response, который будет использоваться для отправки токена JWT обратно клиенту.
 * @возвращает обещание, которое преобразуется в токен JWT.
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { user_name, password } = req.body;
        const token = await login(user_name, password);
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Произошла неизвестная ошибка' });
        }
    }
};