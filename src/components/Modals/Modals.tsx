//@ts-nocheck

import useStore from "@/store/store"
import LoginModal from "../UI/Modal/LoginModal"
import RegistrationModal from "../UI/Modal/RegistrationModal"
import { useEffect } from "react"
import SecondStepModal from "../UI/Modal/SecondStepModal"

export const Modals = () => {



    return(
        <>
            <LoginModal />
            <RegistrationModal />
            <SecondStepModal />
        </>
    )
}