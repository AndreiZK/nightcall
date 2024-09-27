import { colors, rm } from "@/styles";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Icons } from "../Icons";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;

    &.open {
        display: block;
    }
`;

const StyledModal = styled.div`
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.black200};
    padding-inline: ${rm(75)};
    border-radius: ${rm(40)};
    max-width: 80%;
    min-width: 30%;

    &.open {
        display: block;
    }

    .cross {
        cursor: pointer;
        position: absolute;
        top: ${rm(24)};
        right: ${rm(24)};
        height: 20px;
        width: 20px;
    }
`;

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const overlayRef = useRef(null);

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key === "Esc") onClose();
        };

        const closeOnClickOutside = (e: MouseEvent) => {
            if (e.target === overlayRef.current) onClose();
        };

        document.addEventListener("keydown", (e: KeyboardEvent) => closeOnEsc);
        document.addEventListener(
            "click",
            (e: MouseEvent) => closeOnClickOutside
        );

        return () => {
            document.removeEventListener("keydown", closeOnEsc);
            document.removeEventListener("click", closeOnClickOutside);
        };
    }, []);

    return (
        <>
            <ModalOverlay ref={overlayRef} className={isOpen ? "open" : ""} />
            <StyledModal className={isOpen ? "open" : ""}>
                <Icons.cross onClick={onClose} className="cross" />
                {children}
            </StyledModal>
        </>
    );
};

export default Modal;
