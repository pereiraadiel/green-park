import { LoteEntity } from '../entities/lote';

export const LOTE_REPOSITORY = 'LOTE_REPOSITORY';

export interface LoteRepository {
  findMany(): Promise<LoteEntity[]>;
}
