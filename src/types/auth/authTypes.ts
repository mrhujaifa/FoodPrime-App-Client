export interface signUpInput {
  email: string;
  password: string;
  name: string;
  address: string;
}

export interface signInInput {
  email: string;
  password: string;
}

export interface SessionUser {
  email: string;
  role: string;
  address?: string;
  name: string | null;
  image?: string | null;
}
