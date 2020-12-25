import { User, UserTable } from '../../../../domain/User';
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

  getById(id: string): Promise<UserTable> {
    const sql = 'select * from users where ?';
    return new Promise((resolve, reject) => {
      this.connection.query(sql, {id: id}, (err: MysqlError | null, result: UserTable[]) => {
        return err ? reject(err.message) : resolve(result[0]);
      });
    });
  }

  async create(user: User): Promise<string> {
    const sql = 'insert into users set ?';
    return new Promise((resolve, reject) => {
      this.connection.query(sql, user, (err: MysqlError | null) => {
        return err ? reject(err.message) : resolve(user.id as string);
      });
    });
  }

  update(user: User): Promise<void> {
    const sql = 'update users set ? where ?';
    const id = user.id as string;
    delete user.id;
    console.log(user.id);
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [user, {id: id}], (err: MysqlError | null, result: any) => {
        return err ? reject(err.message) : resolve(result);
      });
    });
  }

  delete(id: string): Promise<any> {
    const sql = 'delete from users where ?';
    return new Promise((resolve, reject) => {
      this.connection.query(sql, {id: id}, (err: MysqlError | null, result: any) => {
        return err ? reject(err.message) : resolve(result);
      });
    });
  }
}