import { UserTable } from '../../../../domain/User';
import { IUserRepository } from '../../../../application/repositories/IUserRepository';
import { Connection, MysqlError } from 'mysql';

export class UserRepository implements IUserRepository{
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getAll(): Promise<UserTable[]> {
    const sql = 'select * from users';
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err: MysqlError, results: UserTable[]) => {
        return err ? reject(err.message) : resolve(results);
      });
    });
  }
}