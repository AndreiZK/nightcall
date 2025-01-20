import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import Link from "next/link";
import { Icons } from "../UI/Icons";
import MobileCart from "../Cart/MobileCart";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import router from "next/router";

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

    ${media.xsm`
        border-radius: 0 !important;
    `}

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
        align-items: center;
        gap: ${rm(20)};
        ${media.md`
            gap: ${rm(14)};
        `}

        gap: ${rm(14)};
    }

    ${media.md`
        max-width: unset;
        top: 0;
        left: 0;
        padding: ${rm(16)};
        background: #07070780;
        transform: unset;
        border-radius: 0;
        width: 100%;

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
            align-items: center;
            gap: ${rm(14)};
            display: none;
            background-color: #07070780;
            padding: ${rm(12)};
            border-radius: ${rm(8)};
            width: ${rm(140)};

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
            transform: translate(35%, 35%);
            flex-direction: column;
            align-items: start;
            gap: ${rm(10)};
            display: none;
            background-color: #07070780;
            padding: ${rm(10)};
            border-radius: ${rm(6)};

            ${media.xsm`
                align-items: center;
            `}

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

const StyledTrackIcon = styled.div`
    height: ${rm(36)} !important;
    width: ${rm(36)} !important;
    position: relative;
    cursor: pointer;

    ${media.md`
        height: ${rm(24)} !important;
        width: ${rm(24)} !important;
        margin-top: ${rm(-3)} !important;
    `}

    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100% !important;
        height: 100% !important;
        }
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
    };

    const handleLogOut = () => {
        useStore.setState({ jwtToken: null });
        localStorage.removeItem('jwt');
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
        if (jwt?.length > 7) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [jwt]);

    const handleTrackRedirect = () => {
        if (jwt?.length > 7) {
            router.push("/track");
        } else {
            toast.error("Для просмотра заказов необходимо авторизоваться");
        }
    };

    return (
        <>
            <HeaderContainer>
                <div className="header-content">
                    <a href="/">
                        <Icons.logo />
                    </a>
                    <div className="button-container">
                        <StyledTrackIcon onClick={() => {handleTrackRedirect()}}>
                            <svg onClick={() => {handleTrackRedirect}} width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.41141 6.71151L6.76225 9.35266C6.27533 9.83814 5.82866 10.2835 5.47591 10.686C5.24938 10.9445 5.023 11.2275 4.83125 11.5401L4.80543 11.5144C4.75643 11.4655 4.73192 11.441 4.70731 11.4172C4.24686 10.9704 3.70525 10.6152 3.11145 10.3706C3.07971 10.3575 3.0475 10.3448 2.98309 10.3192L2.58867 10.1629C2.05433 9.95121 1.91192 9.26331 2.3185 8.85798C3.48539 7.69462 4.88641 6.29785 5.56254 6.01731C6.15883 5.7699 6.80298 5.68758 7.42424 5.77939C7.99348 5.86352 8.53197 6.15591 9.41141 6.71151Z" fill="white"/>
                                <path d="M13.9336 20.6179C14.1471 20.8346 14.2888 20.9877 14.4171 21.1513C14.5861 21.367 14.7374 21.5963 14.8692 21.8364C15.0175 22.107 15.1327 22.3959 15.3631 22.9738C15.5506 23.4443 16.1737 23.5688 16.5356 23.2079L16.6231 23.1206C17.79 21.9571 19.1909 20.5604 19.4722 19.8863C19.7204 19.2917 19.8029 18.6496 19.7109 18.0302C19.6265 17.4627 19.3334 16.9259 18.7762 16.0493L16.1183 18.6993C15.6203 19.1958 15.1637 19.6511 14.7508 20.0077C14.5033 20.2214 14.2325 20.435 13.9336 20.6179Z" fill="white"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0491 17.5592L21.1395 11.487C22.0167 10.6125 22.4552 10.1753 22.6862 9.61924C22.9172 9.06328 22.9172 8.44491 22.9172 7.20821V6.61739C22.9172 4.71568 22.9172 3.76482 22.3246 3.17403C21.7321 2.58325 20.7783 2.58325 18.8709 2.58325H18.2783C17.0379 2.58325 16.4177 2.58325 15.86 2.81357C15.3023 3.04388 14.8637 3.48112 13.9867 4.35561L7.89618 10.4278C6.87126 11.4496 6.23576 12.0833 5.98967 12.6952C5.91192 12.8886 5.87305 13.0798 5.87305 13.2804C5.87305 14.1159 6.54742 14.7883 7.89618 16.133L8.07746 16.3137L10.2009 14.1586C10.5037 13.8512 10.9983 13.8475 11.3058 14.1504C11.613 14.4531 11.6167 14.9479 11.3139 15.2552L9.18399 17.4169L9.32673 17.5592C10.6755 18.904 11.35 19.5763 12.1879 19.5763C12.373 19.5763 12.5502 19.5434 12.7284 19.4779C13.3569 19.2463 13.9983 18.6068 15.0491 17.5592ZM17.9104 10.4283C17.1202 11.2159 15.8393 11.2159 15.0492 10.4283C14.2591 9.64053 14.2591 8.36341 15.0492 7.5757C15.8393 6.78797 17.1202 6.78797 17.9104 7.5757C18.7004 8.36341 18.7004 9.64053 17.9104 10.4283Z" fill="white"/>
                            </svg>
                        </StyledTrackIcon>
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
                                    <Link href="/track" className="user-context-menu-item">
                                        Активные заказы
                                    </Link>
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
