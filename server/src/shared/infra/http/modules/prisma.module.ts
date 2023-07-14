import { Global, Module } from '@nestjs/common';
import { PrismaProvider } from '../../prisma/providers/prismaProvider';

@Global()
@Module({
  imports: [],
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class PrismaModule {}
