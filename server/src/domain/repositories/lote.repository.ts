import { LoteEntity } from '../entities/lote';

export interface LoteRepository {
  findMany(): Promise<LoteEntity[]>;
}
