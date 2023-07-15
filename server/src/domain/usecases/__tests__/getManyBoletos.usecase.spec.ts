import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { GetManyBoletosUseCase } from '../getManyBoletos.usecase';
import { BoletoEntity } from '../../entities/boleto';
import {
  BOLETO_REPOSITORY,
  BoletoRepository,
} from '../../repositories/boleto.repository';
import { Readable } from 'stream';

const boleto = new BoletoEntity({
  ativo: true,
  criadoEm: new Date(),
  id: 1,
  linhaDigitavel: '123456',
  nomeSacado: 'Test',
  valor: 1,
  lote: {
    id: 1,
    ativo: true,
    criadoEm: new Date(),
    nome: '0001',
  },
});
const boletoRepository = createMock<BoletoRepository>();

describe('Get Many Boletos Service', () => {
  let service: GetManyBoletosUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetManyBoletosUseCase,
        {
          provide: BOLETO_REPOSITORY,
          useValue: boletoRepository,
        },
      ],
    }).compile();

    service = module.get(GetManyBoletosUseCase);
  });

  describe('Get Many Boletos', () => {
    it('should get many boletos', async () => {
      jest.spyOn(boletoRepository, 'findMany').mockResolvedValue([boleto]);

      const result = (await service.handle({
        id_lote: 1,
      })) as BoletoEntity[];

      expect(result.length).toBe(1);
      expect(result).toStrictEqual([boleto]);
    });

    it('should get reports for boletos', async () => {
      jest
        .spyOn(boletoRepository, 'findMany')
        .mockResolvedValue([boleto, boleto]);

      const result = (await service.handle({
        relatorio: '1',
      })) as { base64: Readable };

      expect(result.base64).toBeDefined();
      expect(result.base64.readable).toBe(true);
    });
  });
});
