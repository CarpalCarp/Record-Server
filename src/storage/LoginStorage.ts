import { ILoginStorage } from './ILoginStorage';
import Database from 'better-sqlite3';
import * as bcrypt from 'bcrypt';
const db = new Database('app.db');

export class LoginStorage implements ILoginStorage {
  async setLogin(username: string, password: string): Promise<{ type: 'ok' } | { type: 'Unauthorized', message: string }> {
    const query = `
      SELECT password FROM users WHERE username = ?;
    `;

    try {
      const result = db.prepare(query).get(username) as { password: string };
      const match = await bcrypt.compare(password, result.password)
      if (match) {
        // Store Session
        return { type: 'ok' };
      } else {
        return { type: 'Unauthorized', message: 'Invalid Credentials' };
      }
    } catch (error) {
      throw new Error(`Error retrieving user credentials: ${error.message}`);
    }
  }
}
