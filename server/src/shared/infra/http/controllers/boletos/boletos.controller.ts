import { ImportPDFAndAssociateWithBoletosUseCase } from './../../../../../domain/usecases/importPDFandAssociateWithBoletos.usecase';
import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GetManyBoletosParamRequest } from './requests/getManyBoletos.request';
import { GetManyBoletosUseCase } from '../../../../../domain/usecases/getManyBoletos.usecase';
import { ImportBoletosFromCSVUseCase } from '../../../../../domain/usecases/importBoletosFromCSV.usecase';
import { FileUploadInterceptor } from '../../interceptors/fileUpload.interceptor';
import { diskStorage } from 'multer';
import * as path from 'path';
import {
  csvFilter,
  generateFilename,
  pdfFilter,
} from '../../utils/fileUpload.util';

@Controller('/boletos')
export class BoletosController {
  constructor(
    private readonly getManyBoletosUseCase: GetManyBoletosUseCase,
    private readonly importBoletosFromCSVUseCase: ImportBoletosFromCSVUseCase,
    private readonly importPdfAndAssociateWithBoletosUseCase: ImportPDFAndAssociateWithBoletosUseCase,
  ) {}

  @Get()
  async getManyBoletos(
    @Query()
    {
      id_lote,
      nome,
      relatorio,
      valor_final,
      valor_inicial,
    }: GetManyBoletosParamRequest,
  ) {
    return await this.getManyBoletosUseCase.handle({
      id_lote: Number(id_lote),
      nome,
      relatorio,
      valor_final: Number(valor_final),
      valor_inicial: Number(valor_inicial),
    });
  }

  @Post('/import/csv')
  @UseInterceptors(
    FileUploadInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',
        filename: generateFilename,
      }),
      fileFilter: csvFilter,
    }),
  )
  async importCSV(@UploadedFile() csv: Express.Multer.File) {
    console.warn(csv);
    return await this.importBoletosFromCSVUseCase.handle(csv.destination);
  }

  @Post('/import/pdf')
  @UseInterceptors(
    FileUploadInterceptor('file', {
      storage: diskStorage({
        destination: './src/	uploads',
        filename: generateFilename,
      }),
      fileFilter: pdfFilter,
    }),
  )
  async importPDF(@UploadedFile() pdf) {
    console.warn(pdf);
    return await this.importPdfAndAssociateWithBoletosUseCase.handle();
  }
}
