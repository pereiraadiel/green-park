import { Entity } from './entity';

export class LoteEntity extends Entity {
  nome: string;
  ativo: boolean;

  constructor(entity: LoteEntity, id?: number) {
    super(entity, id);
    Object.assign(this, entity);
  }
}
