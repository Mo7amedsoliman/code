export type ProfileFields = {
  name: string;
  email: string;
  phone: string;
};

export type PasswordFields = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export type ProfileActionResult = {
  success: boolean;
  message: string;
  user?: Partial<ProfileFields>;
};
