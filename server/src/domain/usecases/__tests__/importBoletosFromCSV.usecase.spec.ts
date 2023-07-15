import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import * as fs from 'fs';
import * as path from 'path';

import { BoletoEntity } from '../../entities/boleto';
import {
  BOLETO_REPOSITORY,
  BoletoRepository,
} from '../../repositories/boleto.repository';
import { ImportBoletosFromCSVUseCase } from '../importBoletosFromCSV.usecase';
import {
  LOTE_REPOSITORY,
  LoteRepository,
} from '../../repositories/lote.repository';
import { LoteEntity } from '../../entities/lote';

const lote = new LoteEntity({
  id: 1,
  ativo: true,
  nome: '0001',
  criadoEm: new Date(),
});
const boleto = new BoletoEntity({
  ativo: true,
  criadoEm: new Date(),
  id: 1,
  linhaDigitavel: '123456123456123456',
  nomeSacado: 'Test',
  valor: 1,
  lote,
});
const boletoRepository = createMock<BoletoRepository>();
const loteRepository = createMock<LoteRepository>();

describe('Import Boletos from CSV Service', () => {
  let service: ImportBoletosFromCSVUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportBoletosFromCSVUseCase,
        {
          provide: BOLETO_REPOSITORY,
          useValue: boletoRepository,
        },
        {
          provide: LOTE_REPOSITORY,
          useValue: loteRepository,
        },
      ],
    }).compile();

    service = module.get(ImportBoletosFromCSVUseCase);
  });

  describe('Import Boletos from CSV', () => {
    const csvPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'csv.csv',
    );

    beforeAll(() => {
      fs.writeFileSync(
        csvPath,
        Buffer.from(
          'nome;unidade;valor;linha_digitavel\nJOSE DA SILVA;1;182.54;123456123456123456',
        ),
      );
    });

    afterAll(() => {
      fs.unlinkSync(csvPath);
    });

    it('should import boletos from csv', async () => {
      jest.spyOn(loteRepository, 'findMany').mockResolvedValue([lote]);
      jest.spyOn(boletoRepository, 'createMany').mockResolvedValue([boleto]);

      await service.handle();

      expect(boletoRepository.createMany).toBeCalledTimes(1);
    });

    it('should returns an exception if not found at least one id_lote from boleto', async () => {
      jest.spyOn(loteRepository, 'findMany').mockResolvedValue([]);
      jest.spyOn(boletoRepository, 'createMany').mockResolvedValue([boleto]);

      await expect(service.handle()).rejects.toThrow();
    });
  });
});
