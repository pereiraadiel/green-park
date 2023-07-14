import { extname } from 'path';
import { MimetypeNotAllowedException } from '../../../exceptions/mimetypeNotAllowed.exception';

export const generateFilename = (
  req: any,
  file: Express.Multer.File,
  callback,
) => {
  const fileExtName = extname(file.originalname);

  callback(null, `${fileExtName.split('.')[1]}${fileExtName}`);
};

export const pdfFilter = (req: any, file: Express.Multer.File, callback) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(
      new MimetypeNotAllowedException('Only pdf files are allowed!', null),
      false,
    );
  }
  callback(null, true);
};

export const csvFilter = (req: any, file: Express.Multer.File, callback) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(
      new MimetypeNotAllowedException('Only csv files are allowed!', null),
      false,
    );
  }
  callback(null, true);
};
