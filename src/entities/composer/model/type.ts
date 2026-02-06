export type Role = "admin" | "moder" | "user";

export type Composer = {
  id: number;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export type ComposerResponse = {
  data: Composer;
};
