import { ReactNode } from "react";

export interface BookProps {
  id: number;
  title: string;
  author: string;
  image: string;
  children?: ReactNode;
}
