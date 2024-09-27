import { colors, rm } from "@/styles";
import { ReactNode } from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
    font-size: ${rm(36)};
    color: ${colors.purple};
    font-weight: 600;
`;

const ModalTitle = ({ children }: { children: ReactNode }) => (
    <StyledSpan>{children}</StyledSpan>
);

export default ModalTitle;
