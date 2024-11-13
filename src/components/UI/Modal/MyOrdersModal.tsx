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
import { Accordion } from "@/components/Modals/Accordion";

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

const MyOrdersModal = (props: Omit<ModalProps, "children">) => {

    const setTrackOpen = useStore((state: any) => (state.setTrackOpen))
    const isTrackOpen = useStore((state: any) => (state.isTrackOpen))

    const [home, setHome] = useState<string>("");
    const [entrance, setEntrance] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [flat, setFlat] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
  
    const [isValid, setIsValid] = useState<boolean>(false)
  
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const [dataToRender, setDataToRender] = useState<any>([]);

    const jwt = useStore((state: any) => state.jwtToken);
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczMTUyMDA1NiwiZXhwIjoxNzM0MTEyMDU2fQ.EFeyUxIzdPRC_skHDAghMxwI6RkF4OU37ZbnJQs1JG0`); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE4MjkyOTg4LCJleHAiOjE3MjA4ODQ5ODh9.v-hBVCOiCAPM0TDa3_uoEEIHj6PycCHJH9CZHr9esEg
  
    const requestAdressOptions: any = () => {
      return {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
    };
  
    const findActiveOrders = () => {
        if (jwt?.length < 7) {
          return;
        }
      
        fetch(`${BASE_API_URL}api/order/my?populate=*`, requestAdressOptions)
          .then((response) => response.text())
          .then((result) => {
            const parsedResult = JSON.parse(result);


            const reversedArray = parsedResult.slice().sort((a: any, b: any) => b.id - a.id); // Создаем копию и сортируем по id в обратном порядке
            setDataToRender(reversedArray);
            console.log("data to render", reversedArray);
          })
          .catch((error) => console.error(error));
      };


    useEffect(() => {
        findActiveOrders();
    }, [jwt]);

    return (
        <Modal isOpen={isTrackOpen} onClose={() => setTrackOpen(false)}>
            <StyledContainer>
                <ModalTitle>Предыдущие заказы</ModalTitle>
                {dataToRender.map((item: any, index: number) => (
                    <Accordion data={item} key={item.id} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                ))}
                {/* <StyledBottomContainer>
                    <Button onClick={updateUserData}>Сохранить</Button>
                </StyledBottomContainer> */}
            </StyledContainer>
        </Modal>
    );
};

export default MyOrdersModal;
