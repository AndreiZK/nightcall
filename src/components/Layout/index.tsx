import styled from "styled-components";

import { media, rm } from "@/styles";
import Header from "../Header";
import { ReactNode } from "react";
import Footer from "../Footer";

const StyledWrapperWithFooter = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #070707;
`;

const LayoutContainer = styled.div`
    max-width: ${rm(1320)};

    margin-inline: auto;
    position: relative;
    .content-container {
        padding-top: ${rm(200)};
    }

    ${media.md`
        max-width: unset;
        width: calc(100vw - ${rm(0)});
        padding-inline: ${rm(16)};
        overflow: hidden;
        .content-container {
        padding-top: ${rm(100)};
    }
    `}
`;

const Gradient1 = styled.img`
    position: absolute;
    top: 50vh;
    left: 0;
`;
const Gradient2 = styled.img`
    position: absolute;
    top: -30%;
    left: 40%;
`;

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <StyledWrapperWithFooter>
            <Gradient1 src="/images/gradient1.png" />
            <Gradient2 src="/images/gradient2.png" />
            <LayoutContainer>
                <Header />
                <div className="content-container">{children}</div>
            </LayoutContainer>
            <Footer />
        </StyledWrapperWithFooter>
    );
};

export default Layout;
