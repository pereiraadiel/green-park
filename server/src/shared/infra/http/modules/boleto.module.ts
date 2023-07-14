import { Module } from '@nestjs/common';
import { BoletosController } from '../controllers/boletos/boletos.controller';
import { BOLETO_REPOSITORY } from '../../../../domain/repositories/boleto.repository';
import { BoletoPrismaRepository } from '../../prisma/repositories/boletoPrisma.repository';
import { LOTE_REPOSITORY } from '../../../../domain/repositories/lote.repository';
import { LotePrismaRepository } from '../../prisma/repositories/lotePrisma.repository';
import { GetManyBoletosUseCase } from '../../../../domain/usecases/getManyBoletos.usecase';
import { ImportBoletosFromCSVUseCase } from '../../../../domain/usecases/importBoletosFromCSV.usecase';
import { ImportPDFAndAssociateWithBoletosUseCase } from '../../../../domain/usecases/importPDFandAssociateWithBoletos.usecase';

@Module({
  imports: [],
  controllers: [BoletosController],
  providers: [
    {
      provide: BOLETO_REPOSITORY,
      useClass: BoletoPrismaRepository,
    },
    {
      provide: LOTE_REPOSITORY,
      useClass: LotePrismaRepository,
    },
    GetManyBoletosUseCase,
    ImportBoletosFromCSVUseCase,
    ImportPDFAndAssociateWithBoletosUseCase,
  ],
})
export class BoletoModule {}
