//@ts-nocheck

import useStore from "@/store/store"
import LoginModal from "../UI/Modal/LoginModal"
import RegistrationModal from "../UI/Modal/RegistrationModal"
import { useEffect } from "react"
import SecondStepModal from "../UI/Modal/SecondStepModal"
import ProfileModal from "../UI/Modal/ProfileModal"
import OrderModal from "../UI/Modal/OrderModal"
import MyOrdersModal from "../UI/Modal/MyOrdersModal"
import BecomeCourierModal from "../UI/Modal/BecomeCourierModal"
import BecomePartnerModal from "../UI/Modal/BecomePartnerModal"

export const Modals = () => {



    return(
        <>
            <LoginModal />
            <RegistrationModal />
            <SecondStepModal />
            <ProfileModal />
            <OrderModal />
            <MyOrdersModal />
            <BecomeCourierModal />
            <BecomePartnerModal />
        </>
    )
}