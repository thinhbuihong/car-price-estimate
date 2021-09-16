import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //data is what we passed when use decorator
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
