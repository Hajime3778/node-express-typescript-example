import { UserUsecase } from '../src/application/usecase/UserUsecase';
import { User, UserTable } from '../src/domain/User';
import { IUserRepository } from '../src/application/repositories/IUserRepository';

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

function createMockRepository(): IUserRepository { 
   const mockRepository: IUserRepository = {
    getAll: jest.fn(() => new Promise<UserTable[]>((resolve) => resolve(mockUsers))),
     getById: jest.fn((id: string) => new Promise<UserTable>((resolve) => {
       if (id === '1') resolve(mockUser);
     })),
    create: jest.fn((user: User) => new Promise<string>((resolve) => resolve(user.id as string))),
    update: jest.fn((user: User) => new Promise((resolve) => resolve(user.id))),
    delete: jest.fn((id: string) => new Promise((resolve) => resolve(id)))
   };
  return mockRepository;
}

describe('UserUsecase 正常系テスト', () => {
  it('getAll', async () => {
    const mockRepository = createMockRepository();
    const usecase = new UserUsecase(mockRepository);
    const users = await usecase.getAll();
    expect(users).toEqual(mockUsers);
  });
  it('getById', async () => {
    const mockRepository = createMockRepository();
    const usecase = new UserUsecase(mockRepository);
    const user = await usecase.getById('1');
    expect(user).toEqual(mockUser);
  });
  it('create', async () => {
    const mockRepository = createMockRepository();
    const usecase = new UserUsecase(mockRepository);
    const user: User = {
      name: 'test1',
      email: 'test1@example.com',
      description: 'test1',
    };
    const createdId = await usecase.create(user);
    expect(createdId).not.toBeNull();
  });
  it('update', async () => {
    const mockRepository = createMockRepository();
    const usecase = new UserUsecase(mockRepository);
    const user: User = {
      id: '1',
      name: 'test1',
      email: 'test1@example.com',
      description: 'test1',
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const results = await usecase.update(user);
    expect(results).toEqual('1');
  });
  it('delete', async () => {
    const mockRepository = createMockRepository();
    const usecase = new UserUsecase(mockRepository);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const results = await usecase.delete('1');
    expect(results).toEqual('1');
  });
});