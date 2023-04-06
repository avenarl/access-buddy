export interface User {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'male' | 'female' | 'other';
  email: string;
  mobileNumber: number;
  address: string;
}
