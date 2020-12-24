import { User } from '../../domain/User';
import { Connection, MysqlError } from 'mysql';

export class UserRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getAll(): Promise<User[]> {
    const sql = 'select * from users';
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err: MysqlError, results: User[]) => {
        return err ? reject(err.message) : resolve(results);
      });
    });
  }
}