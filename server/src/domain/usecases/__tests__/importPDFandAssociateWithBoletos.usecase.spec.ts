import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ImportPDFAndAssociateWithBoletosUseCase } from '../importPDFandAssociateWithBoletos.usecase';
import { LoteEntity } from '../../entities/lote';
import { BoletoEntity } from '../../entities/boleto';
import {
  BOLETO_REPOSITORY,
  BoletoRepository,
} from '../../repositories/boleto.repository';

jest.mock('../../../shared/utils/pdf.util', () => ({
  PdfUtil: {
    save: jest.fn(),
    split: jest.fn(),
  },
}));
import { PdfUtil } from '../../../shared/utils/pdf.util';

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

describe('Import PDF and Associate With Boletos Service', () => {
  let service: ImportPDFAndAssociateWithBoletosUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportPDFAndAssociateWithBoletosUseCase,
        {
          provide: BOLETO_REPOSITORY,
          useValue: boletoRepository,
        },
      ],
    }).compile();

    service = module.get(ImportPDFAndAssociateWithBoletosUseCase);
  });

  describe('Import PDF and Associate With Boletos', () => {
    it('should import pdf boletos', async () => {
      jest.spyOn(boletoRepository, 'findMany').mockResolvedValue([boleto]);

      await service.handle();

      expect(boletoRepository.findMany).toBeCalledTimes(1);
      expect(PdfUtil.split).toBeCalledTimes(1);
      expect(PdfUtil.save).toBeCalledTimes(1);
    });

    it('should returns an exception if repository throws', async () => {
      jest.spyOn(boletoRepository, 'findMany').mockImplementation(() => {
        return Promise.reject(new Error());
      });

      await expect(service.handle()).rejects.toThrow();
    });
  });
});
