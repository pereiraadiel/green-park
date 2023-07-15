/* eslint-disable @typescript-eslint/no-var-requires */
import * as PdfKit from 'pdfkit';
const MemoryStream = require('memorystream');
import { Readable } from 'stream';

import { BoletoEntity } from '../entities/boleto';

export class GenerateReportService {
  async handle(boletos: BoletoEntity[]) {
    const document = new PdfKit({
      layout: 'portrait',
      margin: 5,
    });
    const memoryStream = new MemoryStream(null, {
      readable: false,
    });
    document.pipe(memoryStream);

    const headerKeys = {
      id: 'id',
      nome_sacado: 'nomeSacado',
      id_lote: 'idLote',
      valor: 'valor',
      linha_digitavel: 'linhaDigitavel',
      ativo: 'ativo',
      criado_em: 'criadoEm',
    };
    const headers = [
      'id',
      'nome_sacado',
      'id_lote',
      'valor',
      'linha_digitavel',
      'ativo',
      'criado_em',
    ];

    const data = boletos.map((boleto) => {
      return {
        ...boleto,
        criadoEm: boleto.criadoEm.toLocaleString('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
      };
    });

    const table = {
      headers,
      rows: data.map((boleto) => headers.map((key) => boleto[headerKeys[key]])),
    };

    const cellMargin = 1;

    let yPosition = document.page.margins.top + 10;

    const tableInitialPosition = {
      x: document.page.margins.left,
      y: yPosition,
    };

    const columnWidth = document.page.width / table.headers.length;

    table.headers.forEach((header, i) => {
      document
        .font('Helvetica-Bold')
        .fontSize(10)
        .text(
          header,
          tableInitialPosition.x + columnWidth * i + 5,
          yPosition + 5,
          {
            width: columnWidth,
            align: 'left',
          },
        );
      document
        .moveTo(
          tableInitialPosition.x + columnWidth * i + columnWidth,
          yPosition,
        )
        .lineTo(
          tableInitialPosition.x + columnWidth * i + columnWidth,
          yPosition + 20 * table.rows.length + 30,
        )
        .lineWidth(0.25)
        .stroke();
    });

    yPosition += 20;

    table.rows.forEach((row) => {
      row.forEach((cell, i) => {
        document
          .font('Helvetica')
          .fontSize(8)
          .text(
            cell,
            tableInitialPosition.x + columnWidth * i + 5,
            yPosition + 5,
            {
              width: columnWidth - cellMargin,
              align: 'left',
              paragraphGap: 1,
            },
          );
      });

      yPosition += 20;
    });

    // bordas
    const tableHeight = table.rows.length * 20 + 30;
    const tableWidth =
      document.page.width -
      document.page.margins.left -
      document.page.margins.right;

    document
      .strokeColor('#000')
      .lineWidth(0.25)
      .rect(
        tableInitialPosition.x,
        tableInitialPosition.y,
        tableWidth,
        tableHeight,
      )
      .stroke();

    document.end();

    return new Promise<string>((resolve, reject) => {
      document.on('error', (error) => {
        reject(error);
      });

      document.on('end', () => {
        const buffer = Buffer.concat(memoryStream.queue);

        resolve(buffer.toString('base64'));
      });
    });
  }
}
