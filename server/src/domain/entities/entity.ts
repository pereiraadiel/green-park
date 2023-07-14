export class Entity {
  id: number;
  criadoEm: Date;

  constructor(entity: Entity, id?: number) {
    Object.assign(this, entity);

    if (id) this.id = id;
  }
}
