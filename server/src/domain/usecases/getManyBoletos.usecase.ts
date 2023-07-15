import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from './usecase';
import {
  BOLETO_REPOSITORY,
  BoletoRepository,
} from '../repositories/boleto.repository';
import { GetManyBoletosDTO } from '../dtos/getManyBoletos.dto';
import { BoletoEntity } from '../entities/boleto';
import { GenerateReportService } from '../services/generateReport.service';

@Injectable()
export class GetManyBoletosUseCase extends UseCase {
  SERVICE_NAME = 'GET_MANY_BOLETOS_USECASE';

  constructor(
    @Inject(BOLETO_REPOSITORY)
    private readonly boletoRepository: BoletoRepository,
  ) {
    super();
  }

  async generateReport(boletos: BoletoEntity[]) {
    const generateReportService = new GenerateReportService();
    const orderedBoletos = boletos.sort((a, b) => a.lote.id - b.lote.id);

    return {
      base64: await generateReportService.handle(orderedBoletos),
    };
  }

  async handle(dto: GetManyBoletosDTO) {
    const boletos = await this.boletoRepository.findMany(dto);

    if (dto.relatorio === '1') {
      return this.generateReport(boletos);
    }

    return boletos;
  }
}
