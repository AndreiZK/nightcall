import styled from "styled-components";

import { rm } from "@/styles";
import Header from "../Header";
import { ReactNode } from "react";
import Footer from "../Footer";

const StyledWrapperWithFooter = styled.div`
    width: 100%;
    min-height: 100vh;
`;

const LayoutContainer = styled.div`
    max-width: ${rm(1320)};

    margin-inline: auto;
    position: relative;
    .content-container {
        padding-top: ${rm(200)};
    }
`;

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <StyledWrapperWithFooter>
            <LayoutContainer>
                <Header />
                <div className="content-container">{children}</div>
            </LayoutContainer>
            <Footer />
        </StyledWrapperWithFooter>
    );
};

export default Layout;
