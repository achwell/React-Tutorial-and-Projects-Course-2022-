import { FC } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo: FC<{ icon: JSX.Element; text: string }> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon} </span>
      <span className="text">{text} </span>
    </Wrapper>
  );
};
export default JobInfo;
