import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * Зарегистрируйте нового пользователя, указав указанный адрес электронной почты и пароль.
 *
 * @param {string} user_name - адрес электронной почты нового пользователя.
 * @param {string} password - пароль нового пользователя.
 * @возвращает {Promise<string>} - токен JWT для вновь созданного пользователя.
 * @выдает {Ошибку} - если пользователь с указанным адресом электронной почты уже существует.
 */
export const register = async (user_name: string, password: string) => {
    const existingUser = await User.findOne({ where: { user_name } });
    if (existingUser) {
        throw new Error('Пользователь уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ user_name, password: hashedPassword });
    return generateToken(newUser);
};

/**
 * Аутентифицирует пользователя с помощью предоставленных электронной почты и пароля.
 *
 * @param {string} user_name - адрес электронной почты пользователя.
 * @param {string} password - пароль пользователя.
 * @возвращает {Promise<string>} - Токен JWT для аутентифицированного пользователя.
 * @выдает {Ошибку} - Если предоставленные учетные данные неверны.
 */
export const login = async (user_name: string, password: string) => {
    const user = await User.findOne({ where: { user_name } });
    if (!user) {
        throw new Error('Неверные учетные данные');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Неверные учетные данные');
    }

    return generateToken(user);
};

const generateToken = (user: User) => {
    return jwt.sign({ id: user.id, user_name: user.user_name }, JWT_SECRET, {
        expiresIn: '1h',
    });
};