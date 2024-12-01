'use client';
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className: string;
    handleClick: () => void;
}

const button = ({ children, className, handleClick }: Props) => {
  return (
    <button className={className} onClick={handleClick}>
        {children}
    </button>
  )
}

export default button