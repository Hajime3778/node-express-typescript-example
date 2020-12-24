import { UserTable } from '../../domain/User';

export interface IUserRepository {
  getAll(): Promise<UserTable[]>
  // getById(): Promise<UserTable>
  // create(): Promise<UserTable>
  // update(): Promise<UserTable>
  // delete(): Promise<UserTable>
}