import { colors, em } from "@/styles";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    color: ${colors.white100};
    background: linear-gradient(42.715deg, #523ffd 0%, #622697 100%);
    padding: 0.5em 2em;
    border-radius: 8px;
    border: none;
    cursor: pointer;
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
