import { media, rm } from "@/styles";
import styled from "styled-components";
import Button from "../UI/Button";
import LoginModal from "../UI/Modal/LoginModal";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useStore from "@/store/store";

const HeaderContainer = styled.div`
    position: fixed;
    max-width: ${rm(1320)};
    top: ${rm(24)};
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 1000;

    background: #d9d9d90c;
    border-radius: 28px;

    backdrop-filter: blur(7px);

    .header-content {
        padding: ${rm(28)} ${rm(50)};
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .button-container {
        font-size: 20px;
    }

    ${media.md`
        max-width: unset;
        top: ${rm(16)};
        left: ${rm(16)};
        background: transparent;
        backdrop-filter: none;
        transform: unset;
        width: calc(100% - 32px);
        .header-content {
        padding: 0;
    }

    .button-container {
        font-size: 20px;
    }
    `}
`;

const Logo = styled.img`
    height: ${rm(40)};
    cursor: pointer;
    ${media.md`
        height: ${rm(24)};
     `}
`;

const Header = () => {
    const setLoginModal = useStore((state: any) => (state.setLoginModal))

    const jwt = useStore((state: any) => state.jwtToken);

    const setProfileModal = useStore((state: any) => (state.setProfileModal))
    const isLoginModalOpen = useStore((state: any) => (state.isLoginModalOpen))

    const handleLogoClick = () => {
        redirect('');
    };

    const handleLoginOpen = () => {
        setLoginModal(true)
    }

    return (
        <>
            <HeaderContainer>
                <div className="header-content">
                    <Logo
                        onClick={handleLogoClick}
                        src="/images/logo.png"
                        alt="logo"
                    />
                    <div className="button-container">
                        {!jwt ? <Button onClick={handleLoginOpen}>
                            Войти
                        </Button> : <p onClick={() => setProfileModal(true)}>ОТКРЫТЬ ПРОФИЛЬ</p>}
                    </div>
                </div>
            </HeaderContainer>
        </>
    );
};

export default Header;
