import { Injectable } from '@nestjs/common';
import { CreateOneBoletoDTO } from '../../../../domain/dtos/createOneBoleto.dto';
import { GetManyBoletosDTO } from '../../../../domain/dtos/getManyBoletos.dto';
import { BoletoEntity } from '../../../../domain/entities/boleto';
import { BoletoRepository } from '../../../../domain/repositories/boleto.repository';
import { PrismaProvider } from '../providers/prismaProvider';

@Injectable()
export class BoletoPrismaRepository implements BoletoRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  async createOne(dto: CreateOneBoletoDTO): Promise<BoletoEntity> {
    throw new Error('Method not implemented.');
  }

  async createMany(dto: CreateOneBoletoDTO[]): Promise<BoletoEntity[]> {
    const boletos = await Promise.all(
      dto.map(async (item) => {
        const alreadyExists = await this.prisma.boleto.findUnique({
          where: {
            linhaDigitavel: item.linhaDigitavel,
          },
        });
        if (alreadyExists) return alreadyExists;

        return await this.prisma.boleto.create({
          data: {
            ativo: item.ativo,
            linhaDigitavel: item.linhaDigitavel,
            nomeSacado: item.nomeSacado,
            valor: item.valor,
            lote: {
              connect: {
                id: item.idLote,
              },
            },
          },
          include: {
            lote: true,
          },
        });
      }),
    );

    return boletos.map((boleto) => {
      console.warn(boleto);
      return {
        ...boleto,
        valor: Number(boleto.valor),
      };
    });
  }

  async findMany(dto: GetManyBoletosDTO): Promise<BoletoEntity[]> {
    const idLote = dto.id_lote || undefined;
    const nomeSacado = dto.nome ? { contains: dto.nome } : undefined;
    const valor =
      dto.valor_final && dto.valor_inicial
        ? {
            gte: dto.valor_inicial,
            lte: dto.valor_final,
          }
        : undefined;

    const boletos = await this.prisma.boleto.findMany({
      where:
        idLote || nomeSacado || valor
          ? {
              AND: {
                idLote,
                nomeSacado,
                valor,
              },
            }
          : undefined,
      include: {
        lote: true,
      },
    });

    return boletos.map((boleto) => {
      return {
        ...boleto,
        valor: Number(boleto.valor),
      };
    });
  }
}
