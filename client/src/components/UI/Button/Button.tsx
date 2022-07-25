import React from 'react';
// import s from './Button.module.css';
import styled from 'styled-components';


type ButtonProps = {
    onClick: () => void,
    children: string,
    color: string,
}

const ButtonStyled = styled.div`
  &:hover {
    color: #FFFFFF;
    background-color: #1D1F22;
  }
  background: ${({color}) => color || '#FFFFF'};
  width: 140px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:  ${({color}) => color !=='#FFFFF' ? '#ffffff' : '#1D1F22' };
  border: 1px solid ${({color}) => color !=='#FFFFF' ? color : '#1D1F22' };
  cursor: pointer;
`;

export const Button = ({onClick, color, children}: ButtonProps) => {
  return (
    <ButtonStyled
      color={color}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
};
