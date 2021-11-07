import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Session, SessionData } from 'express-session';
import { User } from '../users.entity';
import { UsersService } from '../users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
//This interface allows you to declare additional properties on
//your session object using declaration merging.
declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(+userId);
      req.currentUser = user;
    }

    next();
  }
}
