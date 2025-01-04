import styled from "styled-components";
import Modal, { ModalProps } from ".";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import { colors, media, rm } from "@/styles";
import { BASE_API_URL } from "../../../../constants";
import { requestOptions } from "../../../../constants";
import { validateTelegramId } from "@/utils/validateTelegramId";
import useStore from '../../../store/store'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
    padding-block: ${rm(55)};

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(30)};
        margin-block: ${rm(60)};
    }

    .info{
        display: flex;
        gap: ${rm(12)};

        >div{
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

    .registration{
        display: flex;
        align-items: center;

        p{
            font-size: ${rm(16)};
            color: ${colors.white100};
        }

        span{
            font-size: ${rm(16)};
            color: ${colors.purple};
            cursor: pointer;
        }
    }
`

const SecondStepModal = (props: Omit<ModalProps, "children">) => {

    const isSecondStepModal = useStore((state: any) => (state.isSecondStepModalOpen))
    const setSecondStepModal = useStore((state: any) => (state.setSecondStepModal))

    const mail = useStore((state: any) => state.mail);
    const pass = useStore((state: any) => state.pass);
  
    const [home, setHome] = useState<string>("");
    const [entrance, setEntrance] = useState<string>("");
    const [flat, setFlat] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("+375");
    const [street, setStreet] = useState<string>("");

    const [validation, setValidation] = useState<boolean>(false)

    const jwt = useStore((state: any) => state.jwtToken);

    const phoneRegex = /^\+375\s*(17|25|29|33|44)\s*\d{7}$/;
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE4MjkyOTg4LCJleHAiOjE3MjA4ODQ5ODh9.v-hBVCOiCAPM0TDa3_uoEEIHj6PycCHJH9CZHr9esEg
  
    const requestAdressOptions: any = (raw: any) => {
      return {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
    };
  
    const registrationHandler = () => {
      // Проверяем каждое обязательное поле отдельно
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

      // Если все проверки пройдены, продолжаем регистрацию
      const raw = JSON.stringify({
        email: mail,
        username: mail,
        password: pass,
      });

      fetch(`${BASE_API_URL}api/auth/local/register`, requestOptions(raw))
        .then((response) => response.text())
        .then((result) => {
          console.log(result);

          if (
            JSON.parse(result)?.error?.message ===
            "Email or Username are already taken"
          ) {
            toast.error("Такая почта уже используется");
            return;
          }

          const token = JSON.parse(result).jwt

          if (token) {
            toast.success("Пользователь успешно создан");

            document.cookie = `jwt=${token}; max-age=86400`;

            validateTelegramId(token)

            useStore.setState({
              jwtToken: token,
              isAuth: true,
            });

            setValidation(true);
          }
        })
        .catch((error) => console.error(error));
    };
  
    useEffect(() => {
      if (validation === true) {
  
          const raw = JSON.stringify({
          phone: phone,
          street: street,
          entrance: entrance === "" ? "-" : entrance,
          flat_number: flat === "" ? "-" : flat,
          house_number: home,
          name: name,
        });
  
        fetch(`${BASE_API_URL}api/addAdress`, requestAdressOptions(raw))
          .then((response) => response.text())
          .then((result) => {
            toast.success("Данные успешно добавлены");
            console.log("Результат обновления адреса", result);
          })
          .catch((error) => console.error(error));
  
        setValidation(false);
        setSecondStepModal(false)
      }
    }, [validation]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith('+375')) {
            setPhone(value);
        } else {
            setPhone('+375');
        }
    };

    return (
        <Modal isOpen={isSecondStepModal} onClose={() => setSecondStepModal(false)}>
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
        </Modal>
    );
};

export default SecondStepModal;
