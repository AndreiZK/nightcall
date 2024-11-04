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
import { fontNotoSans } from "@/styles/fonts";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getUser } from "@/utils/getUser";
import { getAdress } from "@/utils/getAdress";

const StyledContainer = styled.div`
    padding-block: ${rm(55)};

    .info{
        margin-top: ${rm(10)};
        display: flex;
        gap: ${rm(12)};

        >div{
            width: 33%;
        }
    }

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(10)};
        margin-block: ${rm(60)};

        .extraText{
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

const ProfileModal = (props: Omit<ModalProps, "children">) => {

    const setProfileModal = useStore((state: any) => (state.setProfileModal))
    const isProfileModalOpen = useStore((state: any) => (state.isProfileModalOpen))

    const [home, setHome] = useState<string>("");
    const [entrance, setEntrance] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [flat, setFlat] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
  
    const [isValid, setIsValid] = useState<boolean>(false)
  
    const jwt = useStore((state: any) => state.jwtToken);
  
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
  
    const getUserInfo = async (token: string) => {
      const user = await getUser(token);
      const adress = await getAdress(token);
  
      if (adress) {
        setName(adress.name);
        setPhone(adress.phone);
        setEntrance(adress.entrance);
        setHome(adress.house_number);
        setFlat(adress.flat_number);
        setStreet(adress.street);
      }
  
      setMail(user.email);
    };
  
    useEffect(() => {
    //   const token: any = parseCookie(document.cookie).jwt;
  
      if (jwt) { //token
        //get user data
        getUserInfo(jwt); //token
      } else {
        useStore.setState({ isAuth: false });
        // redirect("/login", RedirectType.replace);
      }
    }, [jwt]); //nothing
  
    const updateUserData = () => {
        if (jwt.length > 10) {
          const raw = JSON.stringify({
            phone: phone,
            street: street,
            entrance: entrance,
            flat_number: flat,
            house_number: home,
            name: name,
          });
    
          fetch(`${BASE_API_URL}api/addAdress`, requestAdressOptions(raw))
            .then((response) => response.text())
            .then((result) => {
            //   toast.success("Данные успешно обновлены");
              setIsValid(true)
              console.log("Результат обновления адреса", result);
            })
            .catch((error) => console.error(error));
        } else {
        //   toast.error("Авторизуйтесь");
        }
      };

    return (
        <Modal isOpen={isProfileModalOpen} onClose={() => setProfileModal(false)}>
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
                    <Button onClick={updateUserData}>Далее</Button>
                </StyledBottomContainer>
            </StyledContainer>
        </Modal>
    );
};

export default ProfileModal;
