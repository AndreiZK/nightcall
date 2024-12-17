import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import { Icons } from "../Icons";
import { useEffect, useState, useRef } from "react";

const StyledInput = styled.div`
    position: relative;
    width: 100%;
    opacity: 50%;
    transition: opacity 0.3s;

    ${({ isActive }: any) => isActive && `
        opacity: 100%;
        
        .label {
            top: 0;
            transform: translateY(-120%);
            font-size: ${rm(12)} !important;
            z-index: 100;

            &:before {
                z-index: -1;
                content: "";
                position: absolute;
                top: 0;
                left: -10%;
                width: 120%;
                height: 20px;
                background-color: ${colors.black200};
                transition: all 0.3s;
            }
        }
    `}

    input {
        padding: ${rm(14)} ${rm(28)};
        border: 2px solid ${colors.white100};
        background-color: transparent;
        border-radius: 16px;
        font-size: ${rm(24)};
        width: 100%;
        box-sizing: border-box;

        ${media.md`
            padding: ${rm(10)} ${rm(18)};
            font-size: ${rm(16)};
        `}
    }

    .label {
        position: absolute;
        top: ${rm(14)};
        left: ${rm(28)};
        font-size: ${rm(24)};
        color: ${colors.white100};
        transition: all 0.3s;

        ${media.md`
            top: ${rm(10)};
            left: ${rm(18)};
            font-size: ${rm(16)};
        `}
    }

    .search-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    required?: boolean;
    label?: string;
    search?: boolean;
}

const Textfield = ({ label, required, search, value, ...props }: TextfieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isActive = isFocused || value;

    const handleLabelClick = () => {
        inputRef.current?.focus();
    };

    return (
        <StyledInput 
        //@ts-expect-error
        isActive={isActive}>
            <input
                ref={inputRef}
                {...props}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {label && (
                <span className="label" onClick={handleLabelClick}>
                    {label}
                    {required && "*"}
                </span>
            )}
            {search && <Icons.search className="search-icon" />}
        </StyledInput>
    );
};

export default Textfield;
