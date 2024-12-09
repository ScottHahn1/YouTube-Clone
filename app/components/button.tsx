'use client';
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className: string;
    handleClick: () => void;
}

const Button = ({ children, className, handleClick }: Props) => {
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button;