import { FC, useEffect } from "react";
import { Item } from "./App";

const Alert: FC<{
  type: string;
  msg: string;
  removeAlert: (show?: boolean, type?: string, msg?: string) => void;
  list: Item[];
}> = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
