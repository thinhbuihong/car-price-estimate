import { Injectable } from '@nestjs/common';

@Injectable()
export class Users2Service {
  private users;

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        roles: ['admin'],
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess',
        roles: ['user'],
      },
    ];
  }

  async findOne(username) {
    return this.users.find((user) => user.username === username);
  }
}
