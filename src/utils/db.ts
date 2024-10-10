/**
 * Инициализирует экземпляр Sequelize и предоставляет функцию для подключения к базе данных MySQL.
 *
 * Экземпляр Sequelize настраивается с использованием переменных среды для имени базы данных, пользователя, пароля и хоста.
 * Функция `connectDB` может использоваться для аутентификации подключения к базе данных MySQL.
 */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'test_db',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || '',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.PORT_BD ? +process.env.PORT_BD : 3306,
        dialect: 'mysql',
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected');
    } catch (error) {
        console.error('MySQL connection error:', error);
        process.exit(1);
    }
};

export { sequelize, connectDB };