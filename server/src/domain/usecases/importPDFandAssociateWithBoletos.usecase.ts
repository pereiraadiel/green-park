import { Inject, Injectable } from '@nestjs/common';
import { PdfUtil } from '../../shared/utils/pdf.util';
import {
  BOLETO_REPOSITORY,
  BoletoRepository,
} from '../repositories/boleto.repository';
import { UseCase } from './usecase';

@Injectable()
export class ImportPDFAndAssociateWithBoletosUseCase extends UseCase {
  SERVICE_NAME = 'IMPORT_PDF_AND_ASSOCIATE_WITH_BOLETOS_USECASE';

  constructor(
    @Inject(BOLETO_REPOSITORY)
    private readonly boletoRepository: BoletoRepository,
  ) {
    super();
  }

  async handle() {
    try {
      const boletos = await this.boletoRepository.findMany({});

      PdfUtil.save(await PdfUtil.split(), boletos);
    } catch (error) {
      this.catchException(error, null);
    }
  }
}
