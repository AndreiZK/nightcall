import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import styled from "styled-components";
import { colors, media, rm } from "@/styles";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import useStore from '../../../store/store';
import { BASE_API_URL } from "../../../../constants";
import { requestOptions } from "../../../../constants";
import { validateTelegramId } from "@/utils/validateTelegramId";
import { toast } from "react-toastify";
import { setCookie } from '@/utils/cookieUtils';

const StyledContainer = styled.div`
    padding-block: ${rm(55)};

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(30)};
        margin-block: ${rm(60)};
    }

    .info {
        display: flex;
        gap: ${rm(12)};

        > div {
            width: 33%;
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

const SecondStepModal = () => {
    const setModal = useStore((state: any) => state.setModal);
    const activeModal = useStore((state: any) => state.activeModal);
    const mail = useStore((state: any) => state.mail);
    const pass = useStore((state: any) => state.pass);

    const [jwt, setJwt] = useState<string | null>(null);

    const [home, setHome] = useState<string>("");
    const [entrance, setEntrance] = useState<string>("");
    const [flat, setFlat] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("+375");
    const [street, setStreet] = useState<string>("");
    const [validation, setValidation] = useState<boolean>(false);
    const login = useStore((state: any) => state.login);

    const phoneRegex = /^\+375\s*(17|25|29|33|44)\s*\d{7}$/;

    const registrationHandler = () => {
        if (!street.trim()) {
            toast.error("Укажите улицу");
            return;
        }

        if (!home.trim()) {
            toast.error("Укажите номер дома");
            return;
        }

        if (!name.trim()) {
            toast.error("Укажите ваше имя");
            return;
        }

        if (!phone.trim()) {
            toast.error("Укажите номер телефона");
            return;
        }

        if (!phoneRegex.test(phone)) {
            toast.error("Неверный формат номера телефона");
            return;
        }

        const raw = JSON.stringify({
            email: mail,
            username: mail,
            password: pass,
        });

        fetch(`${BASE_API_URL}api/auth/local/register`, requestOptions(raw))
            .then((response) => response.text())
            .then((result) => {
                if (JSON.parse(result)?.error?.message === "Email or Username are already taken") {
                    toast.error("Такая почта уже используется");
                    return;
                }

                const token = JSON.parse(result).jwt;

                if (token) {
                    login(token);
                    setJwt(token);
                    toast.success("Пользователь успешно зарегистрирован");
                    validateTelegramId(token);
                    setValidation(true);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        if (validation && jwt != null) {
            const requestData = {
                phone: phone,
                street: street,
                entrance: entrance || "-",
                flat_number: flat || "-",
                house_number: home,
                name: name,
            };

            console.log('Sending request with data:', requestData);

            const requestOptions = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData),
                redirect: "follow" as RequestRedirect,
            };

            console.log('Request options:', {
                url: `${BASE_API_URL}api/addAdress`,
                headers: requestOptions.headers,
                body: requestOptions.body
            });

            fetch(`${BASE_API_URL}api/addAdress`, requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    console.log('Raw response:', data);
                    
                    if (!response.ok) {
                        console.error('Response not OK:', {
                            status: response.status,
                            statusText: response.statusText,
                            data: data
                        });
                        throw new Error(data.error?.message || 'Произошла ошибка при добавлении адреса');
                    }
                    
                    return data;
                })
                .then((result) => {
                    console.log('Success response:', result);
                    toast.success("Данные успешно добавлены");
                    setValidation(false);
                    setModal('profile');
                })
                .catch((error) => {
                    console.error('Detailed error:', {
                        message: error.message,
                        stack: error.stack
                    });
                    toast.error(error.message);
                });
        }
    }, [validation, jwt]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith('+375')) {
            setPhone(value);
        } else {
            setPhone('+375');
        }
    };

    return (
        activeModal === 'secondStep' && (
            <BaseModal isOpen={activeModal === 'secondStep'} onClose={() => setModal(null)}>
                <StyledContainer>
                    <ModalTitle>Создайте учётную запись!</ModalTitle>
                    <div className="textfields">
                        <Textfield value={street} onChange={(e) => setStreet(e.target.value)} required label="Улица" />
                        <div className="info">
                            <Textfield value={home} onChange={(e) => setHome(e.target.value)} required label="Дом" />
                            <Textfield value={flat} onChange={(e) => setFlat(e.target.value)} label="Квартира" />
                            <Textfield value={entrance} onChange={(e) => setEntrance(e.target.value)} label="Подьезд" />
                        </div>
                        <Textfield value={name} onChange={(e) => setName(e.target.value)} required label="имя" />
                        <Textfield 
                            value={phone} 
                            onChange={handlePhoneChange} 
                            required 
                            label="Телефонный номер" 
                        />
                    </div>

                    <StyledBottomContainer>
                        <Button onClick={registrationHandler}>Зарегистрироваться</Button>
                    </StyledBottomContainer>
                </StyledContainer>
            </BaseModal>
        )
    );
};

export default SecondStepModal;
