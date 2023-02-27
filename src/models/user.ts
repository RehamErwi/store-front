import bcrypt from 'bcrypt';
import config from '../config';
import db from '../database';

export type User = {
    id?: string;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
};

const hashPassword = (password: string) => {
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
    // Create users
    async create(u: User): Promise<User> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                `INSERT INTO users (email, user_name, first_name, last_name, password)
            values ($1, $2, $3, $4, $5) RETURNING id, email, user_name, first_name, last_name`,
                [
                    u.email,
                    u.user_name,
                    u.first_name,
                    u.last_name,
                    hashPassword(u.password),
                ]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Unable to create user, ${error}`);
        }
    }
    // Get all users
    async getUsers(): Promise<User[]> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'SELECT id, email, user_name, first_name, last_name from users'
            );

            connection.release();

            const res = result.rows;
            return res;
        } catch (error) {
            throw new Error(`Error at retrieving users ${error}`);
        }
    }
    // Get user
    async getUser(id: string): Promise<User> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'SELECT id, email, user_name, first_name, last_name from users WHERE id=($1)',
                [id]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Could not find user with id ${id}, ${error}`);
        }
    }
    // Update user
    async updateUser(u: User): Promise<User> {
        try {
            const connection = await db.connect();
            const result = await connection.query(
                'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=($6) RETURNING id, email, user_name, first_name, last_name',
                [
                    u.email,
                    u.user_name,
                    u.first_name,
                    u.last_name,
                    hashPassword(u.password),
                    u.id,
                ]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Could not update user ${u.user_name}, ${error}`);
        }
    }
    // Delete user
    async deleteUser(id: string): Promise<User> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'DELETE FROM users WHERE id=($1) RETURNING id, email, user_name, first_name, last_name',
                [id]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Could not delete user with id ${id}, ${error}`);
        }
    }
    //Auth
    async authenticate(email: string, password: string): Promise<User | null> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'SELECT password FROM users WHERE email=$1',
                [email]
            );
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                const isPasswordValid = bcrypt.compareSync(
                    `${password}${config.pepper}`,
                    hashPassword
                );
                if (isPasswordValid) {
                    const userInfo = await connection.query(
                        'SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)',
                        [email]
                    );
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (error) {
            throw new Error(`Cannot login ${error}`);
        }
    }
}

export default UserModel;
