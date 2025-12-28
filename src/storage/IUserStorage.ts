import { User } from '../types/User';

export interface IUserStorage {
  getUsers(): { type: 'ok', value: User[] }
  getUserById(id: string): { type: 'ok', value: User } | { type: 'notFound', message: string }
  addUser(user: User): { type: 'ok', message: string }
  updateUser(id: string, user: Omit<User, 'id'>): { type: 'ok', message: string } | { type: 'notFound', message: string }
  deleteUser(id: string): { type: 'ok', message: string } | { type: 'notFound', message: string }
}
