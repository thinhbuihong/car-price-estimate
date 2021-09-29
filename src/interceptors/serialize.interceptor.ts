import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //run somethings before a request is handled
    console.log('Im running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        //run before reponse send out
        return plainToClass(this.dto, data, {
          //just keep explose pros in dto
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
