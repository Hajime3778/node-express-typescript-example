import { v4 as uuid } from 'uuid';
import { User, UserTable } from '../../domain/User';
import { IUserRepository } from '../../application/repositories/IUserRepository';
import { IUserUsecase } from '../../application/usecase/interfaces/IUserUsecase';

export class UserUsecase implements IUserUsecase{
  private userRepository: IUserRepository
  
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAll(): Promise<UserTable[]> {
    return this.userRepository.getAll();
  }

  async getById(id: string): Promise<UserTable> {
    return this.userRepository.getById(id);
  }

  async create(user: User): Promise<string> {
    user.id = uuid();
    return this.userRepository.create(user);
  }

  async update(user: User): Promise<any> {
    return this.userRepository.update(user);
  }

  async delete(id: string): Promise<any> {
    return this.userRepository.delete(id);
  }
}