import React from 'react';
import s from './Button.module.css';

type ButtonProps = {
    onClick: () => void,
    children: string
}

export const Button = ({onClick, children}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={s.Button}
    >
      {children}
    </div>
  );
};
