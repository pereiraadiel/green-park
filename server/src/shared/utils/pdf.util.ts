/* eslint-disable @typescript-eslint/no-var-requires */
const { splitPDF } = require('pdf-toolz/SplitCombine');
const PDFScrapper = require('pdf-scraper');

import * as path from 'path';
import * as fs from 'fs';
import { BoletoEntity } from '../../domain/entities/boleto';

const UPLOAD_PATH = path.resolve(__dirname, '..', '..', 'uploads/');

const split = async () => {
  const pdf = fs.readFileSync(UPLOAD_PATH.concat('/pdf.pdf'));

  const pdfPages: Buffer[] = await splitPDF(pdf);

  return pdfPages;
};

const save = async (pdfPages: Buffer[], boletos: BoletoEntity[]) => {
  const splittedUploadPath = UPLOAD_PATH.concat('/splitted');
  if (!fs.existsSync(splittedUploadPath)) {
    fs.mkdirSync(splittedUploadPath);
  }

  pdfPages.map((buffer) => {
    PDFScrapper(buffer).then(({ text }) => {
      const boleto = boletos.find((item) => text.includes(item.linhaDigitavel));
      if (!boleto) return;

      fs.writeFileSync(splittedUploadPath.concat(`/${boleto.id}.pdf`), buffer);
    });
  });
};

export const PdfUtil = {
  split,
  save,
};

// ==
const exec = async () => {
  save(await split(), [
    {
      ativo: true,
      criadoEm: new Date(),
      id: 10,
      linhaDigitavel: '987654321',
      nomeSacado: 'adasdas',
      valor: 30.2,
      lote: {
        ativo: true,
        nome: '',
        criadoEm: new Date(),
        id: 2,
      },
    },
    {
      ativo: true,
      criadoEm: new Date(),
      id: 15,
      linhaDigitavel: '147258369096385274',
      nomeSacado: 'adasdas',
      valor: 30.2,
      lote: {
        ativo: true,
        nome: '',
        criadoEm: new Date(),
        id: 2,
      },
    },
    {
      ativo: true,
      criadoEm: new Date(),
      id: 20,
      linhaDigitavel: '852654987123065498',
      nomeSacado: 'adasdas',
      valor: 30.2,
      lote: {
        ativo: true,
        nome: '',
        criadoEm: new Date(),
        id: 2,
      },
    },
  ]);
};

exec();
