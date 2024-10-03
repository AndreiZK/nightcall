import { colors, media, rm } from "@/styles";
import { ReactNode } from "react";
import styled from "styled-components";

const StyledSectionTitle = styled.h4`
    color: ${colors.purple};
    font-size: ${rm(52)};
    font-weight: 400;

    ${media.md`
        font-size: ${rm(28)};
        text-align: center;
    `}
`;

const SectionTitle = ({ children }: { children: ReactNode }) => {
    return <StyledSectionTitle>{children}</StyledSectionTitle>;
};

export default SectionTitle;
