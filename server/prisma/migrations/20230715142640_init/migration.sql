-- CreateTable
CREATE TABLE "lotes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boletos" (
    "id" SERIAL NOT NULL,
    "nome_sacado" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "linha_digitavel" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "id_lote" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "boletos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boletos_linha_digitavel_key" ON "boletos"("linha_digitavel");

-- AddForeignKey
ALTER TABLE "boletos" ADD CONSTRAINT "boletos_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
