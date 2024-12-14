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
import { useEffect, useState } from "react";
import { fontNotoSans } from "@/styles/fonts";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getUser } from "@/utils/getUser";
import { getAdress } from "@/utils/getAdress";
import { Accordion } from "@/components/Modals/Accordion";
import { Icons } from "../Icons";

const StyledContainer = styled.div`
    padding-block: ${rm(40)};

    display: flex;
    flex-direction: column;
    gap: ${rm(32)};

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

    .orders {
        display: flex;
        flex-direction: column;
        gap: ${rm(20)};
        max-height: ${rm(500)};
        overflow-y: scroll;
    }
`;

const MyOrdersModal = (props: Omit<ModalProps, "children">) => {
    const setTrackOpen = useStore((state: any) => state.setTrackOpen);
    const isTrackOpen = useStore((state: any) => state.isTrackOpen);

    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const [dataToRender, setDataToRender] = useState<any>([]);

    const jwt = useStore((state: any) => state.jwtToken);

    const findActiveOrders = () => {
        if (jwt?.length < 7) {
            return;
        }
        fetch(`${BASE_API_URL}api/order/my?populate=*`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            redirect: "follow",
        })
            .then((response) => response.json())
            .then((result) => {
                const reversedArray = result
                    .slice()
                    .sort((a: any, b: any) => b.id - a.id); // Создаем копию и сортируем по id в обратном порядке
                setDataToRender(reversedArray);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        findActiveOrders();
    }, [jwt]);

    return (
        <Modal isOpen={isTrackOpen} onClose={() => setTrackOpen(false)}>
            <StyledContainer>
                <ModalTitle>История заказов</ModalTitle>
                <div className="orders">
                    {dataToRender.map((item: any, index: number) => (
                        <Accordion
                            data={item}
                            key={item.id}
                            index={index}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    ))}
                </div>

                {/* <StyledBottomContainer>
                    <Button onClick={updateUserData}>Сохранить</Button>
                </StyledBottomContainer> */}
            </StyledContainer>
        </Modal>
    );
};

export default MyOrdersModal;
