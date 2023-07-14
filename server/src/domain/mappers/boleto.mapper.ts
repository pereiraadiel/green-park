import { CreateOneBoletoDTO } from '../dtos/createOneBoleto.dto';
import { InputBoletoJSON } from '../interfaces/inputBoletoJSON.interface';

export const inputBoletoJsonToCreateOneBoletoDTOMapper = (
  json: InputBoletoJSON,
  idLote: number,
) => {
  const createOneBoletoDto: CreateOneBoletoDTO = {
    ativo: true,
    idLote,
    linhaDigitavel: json.linha_digitavel,
    nomeSacado: json.nome,
    valor: Number(json.valor),
  };

  return createOneBoletoDto;
};
