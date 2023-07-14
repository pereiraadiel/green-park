import { Lote } from '@prisma/client';
import { Entity } from './entity';

export class BoletoEntity extends Entity {
  nomeSacado: string;
  valor: number;
  linhaDigitavel: string;
  ativo: boolean;
  lote?: Lote;

  constructor(entity: BoletoEntity, id?: number) {
    super(entity, id);
    Object.assign(this, entity);
  }
}
