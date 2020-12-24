//const { v4: uuidv4 } = require('uuid');
import { UserTable } from '../../domain/User';
import { IUserRepository } from '../../application/repositories/IUserRepository';
import { IUserUsecase } from '../../application/usecase/interfaces/IUserUsecase';

export class UserUsecase implements IUserUsecase{
  private userRepository: IUserRepository
  
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAll(): Promise<UserTable[]> {
    return await this.userRepository.getAll();
  }
}