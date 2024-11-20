import styled from "styled-components";
import Modal, { ModalProps } from ".";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import { colors, media, rm } from "@/styles";
import { BASE_API_URL } from "../../../../constants";
import { requestOptions } from "../../../../constants";
import { validateTelegramId } from "@/utils/validateTelegramId";
import useStore from "../../../store/store";
import { useState } from "react";
import { fontNotoSans } from "@/styles/fonts";
import { toast } from "react-toastify";

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

    .registration {
        display: flex;
        align-items: center;

        p {
            font-size: ${rm(16)};
            color: ${colors.white100};
        }

        span {
            font-size: ${rm(16)};
            color: ${colors.purple};
            cursor: pointer;
        }
    }
`;

const BecomePartnerModal = (props: Omit<ModalProps, "children">) => {
    const [mail, setMail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [restaurant, setRestaurant] = useState<string>("");

    const isPartnershipModalOpen = useStore(
        (state: any) => state.isPartnershipModalOpen
    );
    const setPartnershipModal = useStore(
        (state: any) => state.setPartnershipModal
    );

    // const loginHandler = () => {
    //     const raw = JSON.stringify({
    //         identifier: mail,
    //         password: pass,
    //     });

    //     fetch(`${BASE_API_URL}api/auth/local`, requestOptions(raw))
    //         .then((response) => response.text())
    //         .then((result) => {
    //             const token = JSON.parse(result).jwt;

    //             console.log(JSON.parse(result));

    //             if (token) {
    //                 document.cookie = `jwt=${token}; max-age=86400`;
    //                 //86400 - 24 hours

    //                 validateTelegramId(token);

    //                 useStore.setState({ jwtToken: token, isAuth: true });
    //                 //   toast.success("Вход выполнен успешно");
    //                 // props.onClose()
    //                 setCourierModal(false);
    //             } else {
    //                 //   toast.error("Проверьте введённые данные");
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             // toast.error("Проверьте введённые данные");
    //         });

    //     setTrackOpen(true);
    // };

    const handleSubmit = () => {
        const raw = JSON.stringify({
            mail,
            name,
            restaurant,
            phone,
        });

        console.log(raw);
    };

    const handleSuccess = () => {
        setPartnershipModal(false);

        toast.success("Заявка отправлена");
    };

    return (
        <Modal
            isOpen={isPartnershipModalOpen}
            onClose={() => setPartnershipModal(false)}
        >
            <StyledContainer>
                <ModalTitle>Стать курьером</ModalTitle>
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
                    />
                </div>

                <StyledBottomContainer>
                    <Button onClick={handleSubmit}>Отправить</Button>
                    {/* <div className="registration">
                        <p>Нет учётной записи?</p>
                        <span onClick={handleRegisterChange}>
                            Зарегистрируйтесь!
                        </span>
                    </div> */}
                </StyledBottomContainer>
            </StyledContainer>
        </Modal>
    );
};

export default BecomePartnerModal;
