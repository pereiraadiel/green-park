import * as csvtojson from 'csvtojson';

export const CSVtoJSON = async (csv: string) => {
  return await csvtojson({
    noheader: false,
    output: 'json',
    trim: true,
    delimiter: ';',
  }).fromString(csv);
};
