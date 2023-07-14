import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { BoletoModule } from './boleto.module';

@Module({
  imports: [PrismaModule, BoletoModule],
})
export class AppModule {}
