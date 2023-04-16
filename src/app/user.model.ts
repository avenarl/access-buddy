export interface User {
  avatar?: string;
  id: any;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'male' | 'female' | 'other';
  email: string;
  password: string;
  role: 'admin' | 'user';
  mobileNumber: number;
  address: string;
}
