interface IGenericErrorsParams {
  Sucesso: boolean;
  Mensagem: string;
  Severidade: boolean;
}

interface IResponse {
  data: IGenericErrorsParams;
  status: number;
}

export default class GenericException extends Error {
  public readonly Sucesso: boolean;
  public readonly Mensagem: string;
  public readonly Severidade: boolean;
  public readonly status?: number;

  constructor(response: IResponse) {
    super();
    this.Sucesso = response.data?.Sucesso || false;
    this.Mensagem = response.data?.Mensagem || '';
    this.Severidade = response.data?.Severidade || false;
    this.status = response.status;
  }
}