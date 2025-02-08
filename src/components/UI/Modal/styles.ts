import styled from "styled-components";
import { colors, media, rm } from "@/styles";
import { animated } from "@react-spring/web";

export const ModalOverlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled(animated.div)`
  background: ${colors.black200};
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
`; 