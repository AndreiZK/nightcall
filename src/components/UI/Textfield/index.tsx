import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import { Icons } from "../Icons";

const StyledInput = styled.div`
    position: relative;

    width: 100%;
    opacity: 50%;
    transition: opacity 0.3s;

    &:focus-within {
        opacity: 100%;

        .label {
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
                height: 20px;
                background-color: ${colors.black200};
                transition: all 0.3s;
            }
        }
        .search-icon {
            opacity: 1;
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

const Textfield = ({ label, required, search, ...props }: TextfieldProps) => {
    return (
        <StyledInput>
            <input {...props} />
            {label && (
                <span className="label">
                    {label}
                    {required && "*"}
                </span>
            )}
            {search && <Icons.search className="search-icon" />}
        </StyledInput>
    );
};

export default Textfield;
