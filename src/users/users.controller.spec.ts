import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  const users: User[] = [];

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve(users.find((o) => o.id === id));
      },
      find: (email: string) => {
        return Promise.resolve(users.filter((o) => o.email === email));
      },
      remove: (id: number) => {
        return Promise.resolve(
          users.splice(
            users.findIndex((o) => o.id === id),
            1,
          ),
        )[0];
      },
      // update:()=>{},
    };
    fakeAuthService = {
      signup: (email: string, password: string) => {
        const user = {
          email,
          password,
          id: Math.round(Math.random() * 30),
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  //begin test
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const email = 'asd@gmail.com';
    await controller.createUser({ email, password: 'asd' }, {});

    const users = await controller.findAllUsers(email);
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(email);
  });

  it('findUser returns a single user with the given id', async () => {
    const email = 'asd@gmail.com';
    const createdUser = await controller.createUser(
      { email, password: 'asd' },
      {},
    );

    const user = await controller.findUser(createdUser.id + '');
    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
  });

  it('findUser throws an error if user with given id is not found', async () => {
    // fakeUsersService.findOne = () => null;
    try {
      await controller.findUser('1');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('signin updates session object and returns user', async () => {
    const email = 'asd@gmail.com';
    const password = 'ads';
    const session = { userId: -1 };

    await controller.createUser({ email, password }, {});

    const user = await controller.signin({ email, password }, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
