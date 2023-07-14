import { Injectable } from '@nestjs/common';
import { LoteEntity } from '../../../../domain/entities/lote';
import { LoteRepository } from '../../../../domain/repositories/lote.repository';
import { PrismaProvider } from '../providers/prismaProvider';

@Injectable()
export class LotePrismaRepository implements LoteRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  async findMany(): Promise<LoteEntity[]> {
    const lotes = await this.prisma.lote.findMany();
    return lotes;
  }
}
