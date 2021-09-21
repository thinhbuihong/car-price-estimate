import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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

  it('signup with email that is in used', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'asd@gmail.com', password: 'asd' } as User,
      ]);

    service.signup('asd@gmail.com', 'qwe').catch(() => done());
  });
});
