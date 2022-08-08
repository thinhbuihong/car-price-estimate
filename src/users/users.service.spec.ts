import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: {};
};

const users: User[] = [];
beforeEach(() => {
  users.length = 0;
});
export const repositoryMockFactory: () => MockType<Repository<User>> = jest.fn(
  () => ({
    findOne: (id) => users.find((u) => u.id === id),
    create: ({ email, password }) => {
      return { email, password, id: Math.round(Math.random() * 30) } as User;
    },
    save: (user: User) => {
      const id = user.id;
      const index = users.findIndex((u) => u.id === id);

      if (index !== -1) {
        users[index] = user;
      } else {
        users.push(user);
      }
      return user;
    },
    // ...
  }),
);

describe('UsersService', () => {
  const email = 'asd@gmail.com';
  const password = 'asd';
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return new user', async () => {
    const user = await service.create(email, password);

    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
    expect(user.password).toEqual(password);

    const findUser = await service.findOne(user.id);
    expect(findUser).toBeDefined();
    expect(findUser.email).toEqual(email);
  });

  it('should update user data', async () => {
    const newEmail = 'newEmail@gmail.com';
    const user = await service.create(email, password);

    const updatedUser = await service.update(user.id, {
      email: newEmail,
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.email).toEqual(newEmail);
    expect(updatedUser.email).not.toEqual(email);
    expect(updatedUser.id).toEqual(user.id);
  });
});
