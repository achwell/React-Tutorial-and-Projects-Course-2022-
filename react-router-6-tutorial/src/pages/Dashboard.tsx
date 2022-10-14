import { FC } from "react";
import IUser from "../IUser";

const Dashboard: FC<{ user?: IUser }> = ({ user }) => {
  return (
    <section className="section">
      <h4>Hello, {user?.name}</h4>
    </section>
  );
};
export default Dashboard;
