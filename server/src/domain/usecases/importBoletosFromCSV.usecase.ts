import { Injectable } from '@nestjs/common';

import { CSVtoJSON } from '../../shared/utils/csvToJson.util';
import { BoletoRepository } from '../repositories/boleto.repository';
import { LoteRepository } from '../repositories/lote.repository';
import { UseCase } from './usecase';
import { unidadeToIdLoteMapper } from '../mappers/lote.mapper';
import { inputBoletoJsonToCreateOneBoletoDTOMapper } from '../mappers/boleto.mapper';
import { InputBoletoJSON } from '../interfaces/inputBoletoJSON.interface';

@Injectable()
export class ImportBoletosFromCSVUseCase extends UseCase {
  SERVICE_NAME = 'IMPORT_BOLETOS_FROM_CSV_USECASE';

  constructor(
    private readonly boletoRepository: BoletoRepository,
    private readonly loteRepository: LoteRepository,
  ) {
    super();
  }

  async handle(csv: string) {
    try {
      const boletosJson: InputBoletoJSON[] = await CSVtoJSON(csv);
      const lotes = await this.loteRepository.findMany();

      const boletosDTO = boletosJson.map((boleto) => {
        return inputBoletoJsonToCreateOneBoletoDTOMapper(
          boleto,
          unidadeToIdLoteMapper(boleto.unidade, lotes),
        );
      });

      await this.boletoRepository.createMany(boletosDTO);
    } catch (error) {
      this.catchException(error, null);
    }
  }
}
