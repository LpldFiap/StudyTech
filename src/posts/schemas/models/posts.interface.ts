//definimos a estrutura de dados esperada para as postagens
export interface IPosts {
  id?: string; 
  title: string;
  description: string;
  author: string;
  created_at: Date;
}
