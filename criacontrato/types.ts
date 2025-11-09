
export enum View {
  LANDING = 'landing',
  LOGIN = 'login',
  REGISTER = 'register',
  DASHBOARD = 'dashboard',
}

export interface Contract {
  id: string;
  title: string;
  createdAt: string;
  status: 'Gratuito' | 'Pro' | 'Business';
  parties: string;
}

export interface User {
  name: string;
  email: string;
  plan: 'Gratuito' | 'Pro' | 'Business';
}
