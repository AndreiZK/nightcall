import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import styled from "styled-components";
import { colors, media, rm } from "@/styles";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import useStore from "../../../store/store";
import { toast } from "react-toastify";
import emailJs from "@emailjs/browser";
import { serviceId, templateId, userId } from '../../../../constants';

const StyledContainer = styled.div`
    padding-block: ${rm(55)};

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(30)};
        margin-block: ${rm(60)};
    }

    ${media.md`
        padding-block: ${rm(14)};

        .textfields {
            gap: ${rm(16)};
        }
    `}
`;

const StyledBottomContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${rm(20)};

    button {
        font-size: ${rm(20)};
    }
`;

const BecomePartnerModal = () => {
    const [mail, setMail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [restaurant, setRestaurant] = useState<string>("");

    const isPartnershipModalOpen = useStore((state: any) => state.isPartnershipModalOpen);
    const setPartnershipModal = useStore((state: any) => state.setPartnershipModal);

    const templateParams = {
        from_name: name,
        email: mail,
        phone: phone,
        address: restaurant,
    };
    
    useEffect(() => {
        emailJs.init({
            publicKey: userId,
            blockHeadless: true,
            limitRate: {
                id: "app",
                throttle: 10000,
            },
        });
    }, []);
    
    const handleSubmit = () => {
        if(name && mail && phone && restaurant) {
            emailJs.send(serviceId, 'template_0zjaapd', templateParams).then(
                (response) => {
                    toast.success("Заявка отправлена!");
                    setPartnershipModal(false);
                },
                (error) => {
                    toast.error("Что-то пошло не так, попробуйте позже");
                }
            );
        } else {
            toast.error("Заполните все поля");
        }
    };

    return (
        <BaseModal
            isOpen={isPartnershipModalOpen}
            onClose={() => setPartnershipModal(false)}
        >
            <StyledContainer>
                <ModalTitle>Стать партнером</ModalTitle>
                <div className="textfields">
                    <Textfield
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        label="ФИО"
                    />
                    <Textfield
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        label="Электронная почта"
                        required
                    />
                    <Textfield
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        required
                        label="Название ресторана"
                    />
                    <Textfield
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        label="Мобильный телефон"
                        required
                    />
                </div>

                <StyledBottomContainer>
                    <Button onClick={handleSubmit}>Отправить</Button>
                </StyledBottomContainer>
            </StyledContainer>
        </BaseModal>
    );
};

export default BecomePartnerModal;
