export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'male' | 'female' | 'other';
  email: string;
  mobileNumber: string;
  address: string;
}
