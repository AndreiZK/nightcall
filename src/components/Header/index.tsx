import { rm } from "@/styles";
import styled from "styled-components";
import Button from "../UI/Button";
import LoginModal from "../UI/Modal/LoginModal";
import { useState } from "react";

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
`;

const Logo = styled.img`
    height: ${rm(40)};
`;

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <HeaderContainer>
                <div className="header-content">
                    <Logo src="/images/logo.png" alt="logo" />
                    <div className="button-container">
                        <Button onClick={() => setModalOpen(true)}>
                            Войти
                        </Button>
                    </div>
                </div>
            </HeaderContainer>
            <LoginModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
};

export default Header;
