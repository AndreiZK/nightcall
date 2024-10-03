import styled from "styled-components";
import Modal, { ModalProps } from ".";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import { media, rm } from "@/styles";

const StyledContainer = styled.div`
    padding-block: ${rm(55)};

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(30)};
        margin-block: ${rm(60)};
    }

    button {
        font-size: ${rm(20)};
    }

    ${media.md`
        padding-block: ${rm(14)};

        .textfields {
            gap: ${rm(16)};
        }
    `}
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
