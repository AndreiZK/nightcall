//@ts-nocheck

import useStore from "@/store/store"
import LoginModal from "../UI/Modal/LoginModal"
import RegistrationModal from "../UI/Modal/RegistrationModal"
import SecondStepModal from "../UI/Modal/SecondStepModal"
import ProfileModal from "../UI/Modal/ProfileModal"
import OrderModal from "../UI/Modal/OrderModal"
import MyOrdersModal from "../UI/Modal/MyOrdersModal"
import BecomeCourierModal from "../UI/Modal/BecomeCourierModal"
import BecomePartnerModal from "../UI/Modal/BecomePartnerModal"
import { useTransition } from "@react-spring/web"

export const Modals = () => {
    const {
        isLoginModalOpen,
        isRegistrationModalOpen,
        isSecondStepModalOpen,
        isProfileModalOpen,
        isOrderModalOpen,
        isTrackOpen,
        isCourierModalOpen,
        isPartnershipModalOpen
    } = useStore((state: any) => ({
        isLoginModalOpen: state.isLoginModalOpen,
        isRegistrationModalOpen: state.isRegistrationModalOpen,
        isSecondStepModalOpen: state.isSecondStepModalOpen,
        isProfileModalOpen: state.isProfileModalOpen,
        isOrderModalOpen: state.isOrderModalOpen,
        isTrackOpen: state.isTrackOpen,
        isCourierModalOpen: state.isCourierModalOpen,
        isPartnershipModalOpen: state.isPartnershipModalOpen
    }));

    const modals = [
        { isOpen: isLoginModalOpen, component: LoginModal },
        { isOpen: isRegistrationModalOpen, component: RegistrationModal },
        { isOpen: isSecondStepModalOpen, component: SecondStepModal },
        { isOpen: isProfileModalOpen, component: ProfileModal },
        { isOpen: isOrderModalOpen, component: OrderModal },
        { isOpen: isTrackOpen, component: MyOrdersModal },
        { isOpen: isCourierModalOpen, component: BecomeCourierModal },
        { isOpen: isPartnershipModalOpen, component: BecomePartnerModal }
    ];

    const transitions = useTransition(
        modals.filter(modal => modal.isOpen),
        {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 },
            config: { duration: 1000 }
        }
    );

    return (
        <>
            {transitions((styles, modal) => {
                const ModalComponent = modal.component;
                return <ModalComponent key={ModalComponent.name} />;
            })}
        </>
    )
}