import styled from "styled-components";
import Modal, { ModalProps } from ".";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import { rm } from "@/styles";

const StyledContainer = styled.div`
    padding-block: ${rm(80)} ${rm(55)};
    width: ${rm(700)};

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(30)};
        margin-block: ${rm(60)} ${rm(80)};
    }

    button {
        font-size: ${rm(20)};
    }
`;

const LoginModal = (props: Omit<ModalProps, "children">) => {
    return (
        <Modal {...props}>
            <StyledContainer>
                <ModalTitle>Вход в учетную запись</ModalTitle>
                <div className="textfields">
                    <Textfield required label="email" />
                    <Textfield label="пароль" />
                </div>

                <Button>Войти</Button>
            </StyledContainer>
        </Modal>
    );
};

export default LoginModal;
