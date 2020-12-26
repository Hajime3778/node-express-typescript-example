import express, { Application } from 'express';
import { IUserUsecase } from '../src/application/usecase/interfaces/IUserUsecase';
import { UserController } from '../src/interface/controllers/UserController';
import { User, UserTable } from '../src/domain/User';
  
import request from 'supertest';
import bodyParser from 'body-parser';

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
    getById: jest.fn((id: string) => new Promise<UserTable>((resolve, reject) => {
      if (id === '1') resolve(mockUser);
      else reject();
    })),
   create: jest.fn((user: User) => new Promise<string>((resolve, reject) => user ? resolve(user.id as string): reject())),
   update: jest.fn((user: User) => new Promise((resolve, reject) => user ? resolve(user.id): reject())),
   delete: jest.fn((id: string) => new Promise((resolve, reject) => { 
      if (id === '1') resolve(id);
      else reject();
    }))
  };
 return mockUsecase;
}

describe('UserRepository 正常系テスト', () => {
  it('getAll', () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    app.use('/api/', controller.router);
    return request(app).get('/api/users')
            .expect(200);
  });
  it('getById', () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    app.use('/api/', controller.router);
    return request(app).get('/api/users/1')
            .expect(200);
  });
  it('create', async () => {
    const app: Application = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    const user: User = {
      id: '1',
      name: 'test',
      email: 'test@example.com',
      description: 'test',
    };

    app.use('/api/', controller.router);
    return request(app).post('/api/users').send(user).set('Accept', 'application/json')
            .expect(201);
  });
  it('update', () => {
    const app: Application = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    const user: User = {
      id: '1',
      name: 'test',
      email: 'test@example.com',
      description: 'test',
    };
    app.use('/api/', controller.router);
    return request(app).put('/api/users').send(user).set('Accept', 'application/json')
            .expect(200);
  });
  it('delete', () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    app.use('/api/', controller.router);
    return request(app).delete('/api/users/1')
            .expect(204);
    });
});

describe('UserRepository 異常系テスト', () => {
  it('getAll', () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    mockUsecase.getAll = jest.fn(() => new Promise<UserTable[]>((resolve, reject) => reject('')));
    const controller = new UserController(mockUsecase);
    app.use('/api/', controller.router);
    return request(app).get('/api/users')
            .expect(500);
  });
  it('getById', () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    app.use('/api/', controller.router);
    return request(app).get('/api/users/2')
            .expect(500);
  });
  it('create', async () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);

    app.use('/api/', controller.router);
    return request(app).post('/api/users').set('Accept', 'application/json')
            .expect(400);
  });
  it('update', () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    app.use('/api/', controller.router);
    return request(app).put('/api/users').set('Accept', 'application/json')
            .expect(400);
  });
  it('delete', () => {
    const app: Application = express();
    const mockUsecase = createMockUsecase();
    const controller = new UserController(mockUsecase);
    app.use('/api/', controller.router);
    return request(app).delete('/api/users/2')
            .expect(500);
    });
});
