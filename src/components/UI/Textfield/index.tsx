import { colors, rm } from "@/styles";
import styled from "styled-components";

const StyledInput = styled.div`
    position: relative;

    width: 100%;
    opacity: 50%;
    transition: opacity 0.3s;

    &:focus-within {
        opacity: 100%;

        span {
            top: 0;
            transform: translateY(-50%);
            font-size: ${rm(12)};
            z-index: 100;

            &:before {
                z-index: -1;
                content: "";
                position: absolute;
                top: 0;
                left: -10%;
                width: 120%;
                height: 10px;
                background-color: ${colors.black200};
                transition: all 0.3s;
            }
        }
    }

    input {
        padding: ${rm(14)} ${rm(28)};
        border: 2px solid ${colors.white100};
        background-color: transparent;
        border-radius: 16px;
        font-size: ${rm(24)};
        width: 100%;
        box-sizing: border-box;
    }

    span {
        position: absolute;
        top: ${rm(14)};
        left: ${rm(28)};
        font-size: ${rm(24)};
        color: ${colors.white100};
        transition: all 0.3s;
    }
`;

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    required?: boolean;
    label?: string;
}

const Textfield = ({ label, required, ...props }: TextfieldProps) => {
    return (
        <StyledInput>
            <input {...props} />
            {label && (
                <span>
                    {label}
                    {required && "*"}
                </span>
            )}
        </StyledInput>
    );
};

export default Textfield;
