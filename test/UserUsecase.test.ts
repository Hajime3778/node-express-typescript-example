import { UserUsecase } from '../src/application/usecase/UserUsecase';
import { User, UserTable } from '../src/domain/User';
import { IUserRepository } from '../src/application/repositories/IUserRepository';

function createMockRepository(): IUserRepository { 
   const mockRepository: IUserRepository = {
     getAll: jest.fn(() => new Promise<UserTable[]>((resolve) => { 
       const users: UserTable[] = [
         {
           id: '1',
           name: '1',
           email: '1',
           description: '1',
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
          id: '2',
          name: '2',
          email: '2',
          description: '2',
          createdAt: new Date(),
          updatedAt: new Date(),
         }
       ];
       return resolve(users);
    })),
     getById: jest.fn((id: string) => new Promise<UserTable>((resolve) => { 
       const user: UserTable = {
         id: '1',
         name: '1',
         email: '1',
         description: '1',
         createdAt: new Date(),
         updatedAt: new Date(),
       };
      return resolve(user);
    })),
    create: jest.fn((user: User) => new Promise<string>((resolve) => resolve(user.id))),
    update: jest.fn((user: User) => new Promise((resolve) => resolve('success'))),
    delete: jest.fn((id: string) => new Promise((resolve) => resolve('success')))
   };
  return mockRepository;
}


// describe-it の書き方でもよい
describe('sum() のテスト', () => {
  it('getAll', async () => {
    const mockRepository = createMockRepository();
    const usecase = new UserUsecase(mockRepository);
    const users = await usecase.getAll();
    console.log(users);
  });
});