export default interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  token?: string;
}
