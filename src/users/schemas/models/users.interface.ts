export interface IUsers {
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
  created_at: Date;
}
