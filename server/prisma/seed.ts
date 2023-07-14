import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const lotes = [
  {
    ativo: true,
    nome: '0015',
  },
  {
    ativo: true,
    nome: '0016',
  },
  {
    ativo: true,
    nome: '0017',
  },
  {
    ativo: true,
    nome: '0018',
  },
  {
    ativo: true,
    nome: '0019',
  },
];

const main = async () => {
  console.group('seeding db');
  await prisma.lote.deleteMany({
    where: {
      nome: {
        in: lotes.map((lote) => lote.nome),
      },
    },
  });

  await Promise.all(
    lotes.map(async (lote) => {
      await prisma.lote.create({
        data: lote,
      });
      console.warn(`lote ${lote.nome} inserted`);
    }),
  );
  console.groupEnd();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
