import { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import styled from "styled-components";
import { colors, media, rm } from "@/styles";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import useStore from '../../../store/store';
import { BASE_API_URL } from "../../../../constants";
import { requestOptions } from "../../../../constants";
import { validateTelegramId } from "@/utils/validateTelegramId";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
    padding-block: ${rm(55)};

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(30)};
        margin-block: ${rm(60)};
    }

    ${media.md`
        padding-block: ${rm(14)};

        .textfields {
            gap: ${rm(16)};
        }
    `}
`;

const StyledBottomContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${rm(20)};

    button {
        font-size: ${rm(20)};
    }

    .registration {
        display: flex;
        align-items: center;
        gap: ${rm(6)};

        ${media.xsm`
            flex-direction: column;
        `}

        p {
            font-size: ${rm(16)};
            color: ${colors.white100};
        }

        span {
            font-size: ${rm(16)};
            color: ${colors.purple};
            cursor: pointer;
        }
    }
`;


const LoginModal = () => {
    const [mail, setMail] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const setModal = useStore((state: any) => state.setModal);
    const isLoginModalOpen = useStore((state: any) => state.isLoginModalOpen);
    const activeModal = useStore((state: any) => state.activeModal);

    const setLoginModal = useStore((state: any) => state.setLoginModal);
    const setProfileModal = useStore((state: any) => state.setProfileModal);
    const setRegistrationModal = useStore((state: any) => state.setRegistrationModal);

    const login = useStore((state: any) => state.login);

    const handleClose = () => {
        setModal(null);
    };

    const loginHandler = () => {
        const raw = JSON.stringify({
            identifier: mail,
            password: pass,
        });

        fetch(`${BASE_API_URL}api/auth/local`, requestOptions(raw))
            .then((response) => response.text())
            .then((result) => {
                const token = JSON.parse(result).jwt;

                if (token) {
                    login(token);
                    validateTelegramId(token);
                    toast.success("Вход выполнен успешно");
                    setModal('profile');
                } else {
                    toast.error("Проверьте введённые данные");
                }
            })
            .catch((error) => {
                toast.error("Проверьте введённые данные");
            });
    };

    const handleRegisterChange = () => {
        setLoginModal(false);
        setRegistrationModal(true);
    };

    return (
        isLoginModalOpen && (
            <BaseModal isOpen={isLoginModalOpen} onClose={handleClose}>
                <StyledContainer>
                    <ModalTitle>Вход в учетную запись</ModalTitle>
                    <div className="textfields">
                        <Textfield 
                            value={mail} 
                            onChange={(e) => setMail(e.target.value)} 
                            required 
                            label="email" 
                        />
                        <Textfield 
                            value={pass} 
                            onChange={(e) => setPass(e.target.value)} 
                            required 
                            label="пароль" 
                        />
                    </div>

                    <StyledBottomContainer>
                        <Button onClick={loginHandler}>Войти</Button>
                        <div className="registration">
                            <p>Нет учётной записи?</p>
                            <span onClick={() => setModal('registration')}>Зарегистрируйтесь!</span>
                        </div>
                    </StyledBottomContainer>
                </StyledContainer>
            </BaseModal>
        )
    );
};

export default LoginModal;
