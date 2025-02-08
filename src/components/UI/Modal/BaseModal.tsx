import { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { ModalOverlay, ModalContainer } from "./styles";
import { Icons } from "../Icons";

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const [{ opacity: overlayOpacity }, overlayApi] = useSpring(() => ({
    opacity: 0,
    config: { duration: 200 },
  }));

  const [{ opacity, transform }, modalApi] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(-20px)",
    config: { duration: 200 },
  }));

  useEffect(() => {
    if (isOpen) {
      overlayApi.start({ opacity: 1 });
      modalApi.start({ opacity: 1, transform: "translateY(0)" });
      document.body.style.overflow = "hidden";
    } else {
      overlayApi.start({ opacity: 0 });
      modalApi.start({ opacity: 0, transform: "translateY(-20px)" });
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const closeOnClickOutside = (e: MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", closeOnEsc);
      document.addEventListener("click", closeOnClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
      document.removeEventListener("click", closeOnClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <ModalOverlay 
      ref={overlayRef} 
      style={{ opacity: overlayOpacity, display: opacity.to(o => o === 0 ? 'none' : 'flex') }}
    >
      <ModalContainer style={{ opacity, transform }}>
        <div className="close-button" onClick={onClose}>
          <Icons.cross />
        </div>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BaseModal; 