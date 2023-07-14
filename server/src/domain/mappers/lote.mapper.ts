import { NotFoundException } from '../../shared/exceptions/notFound.exception';
import { LoteEntity } from '../entities/lote';

export const unidadeToIdLoteMapper = (unidade: string, lotes: LoteEntity[]) => {
  const nome = unidade.padStart(4, '00');
  const lote = lotes.find((lote) => lote.nome === nome);
  if (!lote) throw new NotFoundException(unidade, null);
  return lote.id;
};
