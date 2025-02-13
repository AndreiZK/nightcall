import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import styled from "styled-components";
import { colors, media, rm } from "@/styles";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import useStore from '../../../store/store';
import { BASE_API_URL } from "../../../../constants";
import { getUser } from "@/utils/getUser";
import { getAdress } from "@/utils/getAdress";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
    padding-block: ${rm(55)};

    .info {
        margin-top: ${rm(10)};
        display: flex;
        gap: ${rm(12)};

        > div {
            width: 33%;
        }
    }

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(10)};
        margin-block: ${rm(60)};

        .extraText {
            font-size: ${rm(24)};
        }
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

const ProfileModal = () => {
    const setModal = useStore((state: any) => state.setModal);
    const activeModal = useStore((state: any) => state.activeModal);
    const jwt = useStore((state: any) => state.jwtToken);

    const [mail, setMail] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [home, setHome] = useState<string>('');
    const [flat, setFlat] = useState<string>('');
    const [entrance, setEntrance] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    useEffect(() => {
        if (jwt?.length > 7) {
            getUser(jwt).then((userData: any) => {
                setMail(userData.email);
            });

            getAdress(jwt).then((adressData: any) => {
                setStreet(adressData.street);
                setHome(adressData.house_number);
                setFlat(adressData.flat_number);
                setEntrance(adressData.entrance);
                setPhone(adressData.phone);
                setName(adressData.name);
            });
        }
    }, [jwt]);

    const updateUserData = () => {
        const raw = JSON.stringify({
            phone: phone,
            street: street,
            entrance: entrance === "" ? "-" : entrance,
            flat_number: flat === "" ? "-" : flat,
            house_number: home,
            name: name,
        });

        fetch(`${BASE_API_URL}api/addAdress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: raw,
            redirect: "follow",
        })
            .then((response) => response.text())
            .then((result) => {
                toast.success("Данные успешно обновлены");
                setModal(null);
            })
            .catch((error) => console.error(error));
    };

    return (
        activeModal === 'profile' && (
            <BaseModal isOpen={activeModal === 'profile'} onClose={() => setModal(null)}>
                <StyledContainer>
                    <ModalTitle>Мой профиль</ModalTitle>
                    <div className="textfields">
                        <p className="extraText">Email</p>
                        <Textfield value={mail} onChange={(e) => setMail(e.target.value)} required label="email" />
                        <p className="extraText">Адрес</p>
                        <div className="adress">
                            <Textfield value={street} onChange={(e) => setStreet(e.target.value)} required label="Улица" />
                            <div className="info">
                                <Textfield value={home} onChange={(e) => setHome(e.target.value)} required label="Дом" />
                                <Textfield value={flat} onChange={(e) => setFlat(e.target.value)} label="Квартира" />
                                <Textfield value={entrance} onChange={(e) => setEntrance(e.target.value)} label="Подьезд" />
                            </div>
                        </div>
                        <p className="extraText">Персональные данные</p>
                        <Textfield value={name} onChange={(e) => setName(e.target.value)} required label="имя" />
                        <Textfield value={phone} onChange={(e) => setPhone(e.target.value)} required label="Телефонный номер" />
                    </div>

                    <StyledBottomContainer>
                        <Button onClick={updateUserData}>Сохранить</Button>
                    </StyledBottomContainer>
                </StyledContainer>
            </BaseModal>
        )
    );
};

export default ProfileModal;
