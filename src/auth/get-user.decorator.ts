import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

/**
 * Custom decorator that retrieves the user from the request object.
 * @param data - Additional data passed to the decorator (optional).
 * @param ctx - The execution context containing the request object.
 * @returns The user object from the request.
 */
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
