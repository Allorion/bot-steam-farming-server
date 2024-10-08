/**
 * Определяет модель пользователя для приложения, которая представляет учетную запись пользователя.
 * Модель пользователя используется для хранения пользовательской информации, такой как адрес электронной почты и пароль, в базе данных.
 * Модель определяется с использованием ORM Sequelize и экземпляра `sequelize`, предоставленного в модуле `../utils/db`.
 */
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';

interface IUserAttributes {
    id?: number;
    user_name: string;
    password: string;
}

class User extends Model<IUserAttributes> implements IUserAttributes {
    public id!: number;
    public user_name!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;