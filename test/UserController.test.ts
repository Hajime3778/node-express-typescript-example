import express, { Application } from 'express';
import { IUserUsecase } from '../src/application/usecase/interfaces/IUserUsecase';
import { UserController } from '../src/interface/controllers/UserController';
import { User, UserTable } from '../src/domain/User';
  
import request from 'supertest';

const mockUsers: UserTable[] = [
  {
    id: '1',
    name: 'test1',
    email: 'test1@example.com',
    description: 'test1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'test2',
    email: 'test2@example.com',
    description: 'test2',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]; 

const mockUser: UserTable =
{
  id: '1',
  name: 'test1',
  email: 'test1@example.com',
  description: 'test1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

function createMockUsecase(): IUserUsecase { 
  const mockUsecase: IUserUsecase = {
   getAll: jest.fn(() => new Promise<UserTable[]>((resolve) => resolve(mockUsers))),
    getById: jest.fn((id: string) => new Promise<UserTable>((resolve) => {
      if (id === '1') resolve(mockUser);
    })),
   create: jest.fn((user: User) => new Promise<string>((resolve) => resolve(user.id as string))),
   update: jest.fn((user: User) => new Promise((resolve) => resolve(user.id))),
   delete: jest.fn((id: string) => new Promise((resolve) => resolve(id)))
  };
 return mockUsecase;
}

describe('UserUsecase 正常系テスト', () => {
  it('should return 200 OK', () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    app.use('/api/', controller.router);
    return request(app).get('/api/users')
            .expect(200);
    });
});
