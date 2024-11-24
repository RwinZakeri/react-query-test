// custome hoos types
// use local storage
export interface localStorageType {
  key: string;
  value: any;
}
// form
export interface loginForm {
  userName: string;
  userPassword: string;
}

// users
export type User = {
  id: string;
  userName: string;
  password: string;
  role: string;
};

export type UsersData = {
  users: User[];
};
