import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import Button from "../UI/Button";
import LoginModal from "../UI/Modal/LoginModal";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useStore from "@/store/store";
import Link from "next/link";
import { Icons } from "../UI/Icons";
import MobileCart from "../Cart/MobileCart";
import { toast } from "react-toastify";

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

        svg {
            width: ${rm(150)};
            height: 100%;
        }
    }

    .button-container {
        font-size: 20px;
        display: flex;
        gap: ${rm(20)};
        ${media.md`
            gap: ${rm(14)};
        `}
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
        
    }
    `}

    .desktop-button {
        position: relative;

        .user-context-menu {
            position: absolute;
            top: 0;
            right: 0;
            transform: translateY(60%);
            flex-direction: column;
            align-items: start;
            gap: ${rm(14)};
            display: none;
            background-color: #ffffff18;
            padding: ${rm(12)};
            border-radius: ${rm(8)};

            .user-context-menu-item {
                font-size: ${rm(18)};
                font-weight: bold;
            }

            &.open {
                display: flex;
            }
        }
    }

    .mobile-button {
        background: transparent;
        border: none;
        position: relative;
        svg {
            height: ${rm(24)};
            width: ${rm(24)};
        }
        .cart-counter {
            position: absolute;
            top: -20%;
            right: -20%;
            color: white;
            background-color: ${colors.purple};
            border-radius: 50%;
            width: 14px;
            height: 14px;
            font-size: 12px;
            font-weight: bold;
        }

        .user-context-menu {
            position: absolute;
            top: 0;
            right: 0;
            transform: translateY(60%);
            flex-direction: column;
            align-items: start;
            gap: ${rm(10)};
            display: none;
            background-color: #ffffff18;
            padding: ${rm(10)};
            border-radius: ${rm(6)};

            .user-context-menu-item {
                font-size: ${rm(16)};
                font-weight: bold;
            }

            &.open {
                display: flex;
            }
        }
    }
`;

const Logo = styled.img`
    height: ${rm(40)};
    cursor: pointer;
    ${media.md`
        height: ${rm(24)};
     `}
`;

const Header = () => {
    const setLoginModal = useStore((state: any) => state.setLoginModal);
    const order = useStore((state: any) => state.order);
    const amounts = useStore((state: any) => state.amounts);
    const jwt = useStore((state: any) => state.jwtToken);

    const setProfileModal = useStore((state: any) => state.setProfileModal);
    const setTrackOpen = useStore((state: any) => state.setTrackOpen);

    const isLoginModalOpen = useStore((state: any) => state.isLoginModalOpen);

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [cartCounter, setCartCounter] = useState(0);
    const [cartOpen, setCartOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const isMobile = window.innerWidth <= 768;

    const handleLoginOpen = () => {
        setLoginModal(true);
        console.log("oppening loginModal");
    };

    const handleLogOut = () => {
        useStore.setState({ jwtToken: null });
    };

    useEffect(() => {
        const finalOrder: any = [];

        for (const [key, value] of amounts.entries()) {
            for (let i = 0; i < value; i++) {
                finalOrder.push(key);
            }
        }

        setCartCounter(finalOrder.length);
    }, [amounts, order]);

    useEffect(() => {
        console.log(jwt?.length);
        if (jwt?.length > 7) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [jwt]);

    return (
        <>
            <HeaderContainer>
                <div className="header-content">
                    <Link href="/">
                        <Icons.logo />
                    </Link>
                    <div className="button-container">
                        {!isAuth ? (
                            <Button onClick={handleLoginOpen}>Войти</Button>
                        ) : isMobile ? (
                            <button
                                onClick={() => setUserMenuOpen((prev) => !prev)}
                                className="mobile-button"
                            >
                                <Icons.user />
                                <div
                                    className={`user-context-menu ${
                                        userMenuOpen ? "open" : ""
                                    }`}
                                >
                                    <span
                                        onClick={() => setProfileModal(true)}
                                        className="user-context-menu-item"
                                    >
                                        Профиль
                                    </span>
                                    <span
                                        onClick={() => setTrackOpen(true)}
                                        className="user-context-menu-item"
                                    >
                                        Мои заказы
                                    </span>
                                    <span
                                        onClick={handleLogOut}
                                        className="user-context-menu-item"
                                    >
                                        Выйти
                                    </span>
                                </div>
                            </button>
                        ) : (
                            <Button
                                className="desktop-button"
                                onClick={() => setUserMenuOpen((prev) => !prev)}
                            >
                                Мой аккаунт
                                <div
                                    className={`user-context-menu ${
                                        userMenuOpen ? "open" : ""
                                    }`}
                                >
                                    <span
                                        onClick={() => setProfileModal(true)}
                                        className="user-context-menu-item"
                                    >
                                        Профиль
                                    </span>
                                    <span
                                        onClick={() => setTrackOpen(true)}
                                        className="user-context-menu-item"
                                    >
                                        Мои заказы
                                    </span>
                                    <span
                                        onClick={handleLogOut}
                                        className="user-context-menu-item"
                                    >
                                        Выйти
                                    </span>
                                </div>
                            </Button>
                        )}
                        {!isAuth ? (
                            <></>
                        ) : isMobile ? (
                            <button
                                onClick={() => setCartOpen(true)}
                                className="mobile-button"
                            >
                                {cartCounter > 0 && (
                                    <span className="cart-counter">
                                        {cartCounter}
                                    </span>
                                )}
                                <Icons.cartMobile />
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </HeaderContainer>
            <MobileCart open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
};

export default Header;
