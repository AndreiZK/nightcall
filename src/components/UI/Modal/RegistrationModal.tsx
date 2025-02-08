import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import styled from "styled-components";
import { colors, media, rm } from "@/styles";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import useStore from '../../../store/store';
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
`;

const RegistrationModal = () => {
    const isRegistrationModal = useStore((state: any) => state.isRegistrationModalOpen);
    const setRegistrationModal = useStore((state: any) => state.setRegistrationModal);
    const setSecondStepModal = useStore((state: any) => state.setSecondStepModal);

    const [mail, setMail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    function validateEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const registrationHandler = () => {
        if (!validateEmail(mail)) {
            toast.error("Проверьте почту на ошибки");
            return;
        }

        if (pass.length < 8) {
            toast.error("Минимальная длина пароля - 8 символов");
            return;
        }

        setIsValid(true);
        useStore.setState({ mail: mail, pass: pass, username: mail });
    };

    useEffect(() => {
        if (isValid === true) {
            setIsValid(false);
            setRegistrationModal(false);
            setSecondStepModal(true);
        }
    }, [isValid]);

    return (
        <BaseModal 
            isOpen={isRegistrationModal} 
            onClose={() => setRegistrationModal(false)}
        >
            <StyledContainer>
                <ModalTitle>Создайте учётную запись!</ModalTitle>
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
                    <Button onClick={registrationHandler}>Далее</Button>
                </StyledBottomContainer>
            </StyledContainer>
        </BaseModal>
    );
};

export default RegistrationModal;
