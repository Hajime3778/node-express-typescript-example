import { User, UserTable } from '../../../domain/User';

export interface IUserUsecase { 
  getAll(): Promise<UserTable[]>
  getById(id: string): Promise<UserTable>
  create(user: User): Promise<string>
  update(user: User): Promise<any>
  delete(id: string): Promise<any>
}