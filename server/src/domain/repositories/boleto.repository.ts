import { CreateOneBoletoDTO } from '../dtos/createOneBoleto.dto';
import { GetManyBoletosDTO } from '../dtos/getManyBoletos.dto';
import { BoletoEntity } from '../entities/boleto';

export const BOLETO_REPOSITORY = 'BOLETO_REPOSITORY';

export interface BoletoRepository {
  createOne(dto: CreateOneBoletoDTO): Promise<BoletoEntity>;
  createMany(dto: CreateOneBoletoDTO[]): Promise<BoletoEntity[]>;
  findMany(dto: GetManyBoletosDTO): Promise<BoletoEntity[]>;
}
