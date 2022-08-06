import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user', async () => {
    const user = await service.signup('asd@gmail.com', 'asd');
    expect(user.password).not.toEqual('asd');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('signin with wrong email', (done) => {
    service.signin('asd@gmail.com', 'asd').catch(() => done());
  });

  it('signin with invalid password', async () => {
    await service.signup('asd1@gmail.com', 'asd');

    try {
      await service.signin('asd1@gmail.com', 'asde');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  it('signup with email that is in used', async () => {
    await service.signup('asd@gmail.com', 'asd');

    try {
      await service.signup('asd@gmail.com', 'qwe');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('signin sussesfully', async () => {
    await service.signup('asd2@gmail.com', 'asd');
    const user = await service.signin('asd2@gmail.com', 'asd');
    expect(user).toBeDefined();
  });
});
