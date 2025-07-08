export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  id: number;
  name: string;
  cpf: string;
  email: string;
} 