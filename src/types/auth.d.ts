type User = {
  userId: string;
  email: string;
  username: string;
};

type Gender = 'MALE' | 'FEMALE';

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  username: string;
  email: string;
  password: string;
  gender: Gender;
  dateOfBirth: string;
};

export { User, Gender, LoginCredentials, SignupCredentials };
