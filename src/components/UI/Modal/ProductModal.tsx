import styled from "styled-components";
import Modal, { ModalProps } from ".";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import { rm } from "@/styles";

const StyledContainer = styled.div`
    padding-block: ${rm(55)};
    button {
        font-size: ${rm(20)};
    }
`;

const LoginModal = (props: Omit<ModalProps, "children">) => {
    return (
        <Modal {...props}>
            <StyledContainer>
                <ModalTitle>Название товара</ModalTitle>

                <Button>Войти</Button>
            </StyledContainer>
        </Modal>
    );
};

export default LoginModal;
