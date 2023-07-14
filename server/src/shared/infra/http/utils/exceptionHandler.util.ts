import { ArgumentsHost } from '@nestjs/common';

export const getHttpData = (host: ArgumentsHost) => {
  const ctx = host.switchToHttp();
  return {
    req: ctx.getRequest(),
    res: ctx.getResponse(),
    date: new Date().toISOString(),
  };
};
