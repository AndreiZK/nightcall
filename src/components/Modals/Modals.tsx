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
    const activeModal = useStore((state) => state.activeModal);
    
    const modals = [
        { name: 'login', component: LoginModal },
        { name: 'registration', component: RegistrationModal },
        { name: 'order', component: OrderModal },
        { name: 'track', component: MyOrdersModal },
        { name: 'courier', component: BecomeCourierModal },
        { name: 'partnership', component: BecomePartnerModal },
        { name: 'profile', component: ProfileModal },
        { name: 'secondStep', component: SecondStepModal },
    ];

    const ActiveModal = modals.find(modal => modal.name === activeModal)?.component;

    return ActiveModal ? <ActiveModal /> : null;
};