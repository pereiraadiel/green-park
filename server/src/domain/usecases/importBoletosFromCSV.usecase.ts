import { Inject, Injectable } from '@nestjs/common';

import { CSVtoJSON } from '../../shared/utils/csvToJson.util';
import {
  BOLETO_REPOSITORY,
  BoletoRepository,
} from '../repositories/boleto.repository';
import {
  LOTE_REPOSITORY,
  LoteRepository,
} from '../repositories/lote.repository';
import { UseCase } from './usecase';
import { unidadeToIdLoteMapper } from '../mappers/lote.mapper';
import { inputBoletoJsonToCreateOneBoletoDTOMapper } from '../mappers/boleto.mapper';
import { InputBoletoJSON } from '../interfaces/inputBoletoJSON.interface';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImportBoletosFromCSVUseCase extends UseCase {
  SERVICE_NAME = 'IMPORT_BOLETOS_FROM_CSV_USECASE';

  constructor(
    @Inject(BOLETO_REPOSITORY)
    private readonly boletoRepository: BoletoRepository,
    @Inject(LOTE_REPOSITORY)
    private readonly loteRepository: LoteRepository,
  ) {
    super();
  }

  async handle() {
    try {
      const csvPath = path.resolve(__dirname, '..', '..', 'uploads', 'csv.csv');
      const csv = fs.readFileSync(csvPath).toString('utf8');

      const boletosJson: InputBoletoJSON[] = await CSVtoJSON(csv);
      const lotes = await this.loteRepository.findMany();

      const boletosDTO = boletosJson.map((boleto) =>
        inputBoletoJsonToCreateOneBoletoDTOMapper(
          boleto,
          unidadeToIdLoteMapper(boleto.unidade, lotes),
        ),
      );

      await this.boletoRepository.createMany(boletosDTO);
    } catch (error) {
      this.catchException(error, null);
    }
  }
}
