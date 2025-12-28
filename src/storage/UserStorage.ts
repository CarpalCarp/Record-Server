import { User } from '../types/User';
import { IUserStorage } from './IUserStorage';
import Database from 'better-sqlite3';
const db = new Database('app.db');

export class UserStorage implements IUserStorage {
  getUsers(): { type: 'ok', value: User[] } {
    const query = `
    SELECT * FROM users;
    `;

    try {
      return { type: 'ok', value: db.prepare(query).all() as User[] };
    } catch (error) {
      console.error('Error retrieving users: ', error);
      return { type: 'ok', value: [] };
    }
  }

  getUserById(id: string): { type: 'ok', value: User } | { type: 'notFound'; message: string; } {
    const query = `
      SELECT* FROM users
      WHERE id = ?;
    `;

    try {
      const user = db.prepare(query).get(id) as User;
      if (user) {
        return { type: 'ok', value: user };
      } else {
        return { type: 'notFound', message: 'User not found' };
      }
    } catch (error) {
      throw new Error(`Error retrieving user with id ${id}: ${error.message}`);
    }
  }

  addUser(user: User): { type: 'ok', message: string } {
    const query = `
      INSERT INTO users (id, username, firstName, lastName, email, age, password)
      VALUES (? , ?, ?, ?, ?, ?, ?);
    `;

    const insertUser = db.prepare(query);

    try {
      insertUser.run(user.id,
        user.username,
        user.firstName,
        user.lastName,
        user.email,
        user.age,
        user.password);
      return { type: 'ok', message: `User with id: ${user.id} added` };
    } catch (error) {
      throw new Error(`Error adding user with id ${user.id}: ${error.message} `);
    }
  }

  updateUser(id: string, user: Omit<User, 'id'>): { type: 'ok', message: string } | { type: 'notFound', message: string } {
    throw new Error('Method not implemented.');
  }

  deleteUser(id: string): { type: 'ok', message: string } | { type: 'notFound', message: string } {
    const result = this.getUserById(id);
    if (result.type === 'notFound') {
      return result;
    }

    const query = `
      DELETE FROM users WHERE id = ?;
    `;
    const deleteUser = db.prepare(query);

    try {
      deleteUser.run(id);
      return { type: 'ok', message: `User with id ${id}removed` };
    } catch (error) {
      throw new Error(`Error deleting user with id ${id}: ${error.message}`);
    }
  }

}