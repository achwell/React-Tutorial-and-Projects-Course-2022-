import IUser from "../types/IUser";

export const addUserToLocalStorage = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = (): IUser | undefined => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : undefined;
  return user;
};
