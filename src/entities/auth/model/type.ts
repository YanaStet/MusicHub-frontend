export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UpdateProfileRequest = {
  firstName: string;
  lastName: string;
  bio?: string;
  avatar?: File;
};
