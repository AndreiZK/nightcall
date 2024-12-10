import styles, { colors, media, rm } from "@/styles";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Icons } from "../UI/Icons";
import { BASE_API_URL } from "../../../constants";
import useStore from "@/store/store";

const StyledContent = styled.div`
    transform: translateY(-4px);
    border-bottom-left-radius: ${rm(6)};
    border-bottom-right-radius: ${rm(6)};
    width: ${rm(576)};
    font-size: ${rm(18)};
    line-height: 130%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: ${rm(8)};
    padding-left: ${rm(12)};
    color: ${colors.white100};
    background-color: #313131;

    ${media.lg`
        font-size: ${rm(16)};
        line-height: 150%;
    `}

    ${media.xsm`
        width: 100%;
        font-size: ${rm(14)};
        line-height: 130%;    
    `}
`;

interface ContentAccordionProps {
    activeIndex: number;
    index: number;
    height: number;
    data: any;
}

const StarsContainer = styled.div`
    display: flex;
    margin-left: auto;
    flex-direction: row-reverse;

    svg {
        path {
            fill: grey;
        }

        /* When hovering any SVG, affect itself and all previous siblings */
        &:hover,
        &:hover ~ svg {
            path {
                fill: ${colors.purple};
            }
        }
    }
`;

export const ContentAccordion = ({
    activeIndex,
    index,
    height,
    data,
}: ContentAccordionProps) => {
    const [deliveryStatus, setDeliveryStatus] = useState<string>("");
    const [orderStatus, setOrderStatus] = useState<string>("");

    const jwt = useStore((state: any) => (state.jwtToken)) ;

    const animation: any = useMemo(() => {
        const innerStyle = {
            position: "relative",
            maxHeight:
                height === -1
                    ? "auto"
                    : activeIndex === index
                    ? `${height * 4}px`
                    : "0px",
            transition: `max-height 0.8s ease`,
            overflow: "hidden",
        };

        return innerStyle;
    }, [activeIndex, height, data]);

    const setRating = async (rating: number) => {
        const url = `${BASE_API_URL}api/rate`;

        const raw = JSON.stringify({
            order: data.id,
            value: rating,
        });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${jwt}`
                },
                body: raw,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            return [];
        }
    };

    useEffect(() => {
        if (data.merchant_status === "cooking") {
            setOrderStatus("Заказ готовится");
        } else if (data.merchant_status === "decline") {
            setOrderStatus("Заказ отклонён");
        } else if (data.merchant_status === "waiting") {
            setOrderStatus("Заказ в обработке");
        } else if (data.merchant_status === "ready") {
            setOrderStatus("Заказ готов");
        }

        if (data.courier_status === "searching") {
            setDeliveryStatus("Поиск курьера");
        } else if (data.courier_status === "accepted") {
            setDeliveryStatus("Принят курьером");
        } else if (data.courier_status === "decline_by_merchant") {
            setDeliveryStatus("Отклонён заведением");
        } else if (data.courier_status === "delivering") {
            setDeliveryStatus("В пути");
        } else if (data.courier_status === "on_place") {
            setDeliveryStatus("Курьер на месте");
        } else if (data.courier_status === "finished") {
            setDeliveryStatus("Заказ доставлен");
        }
    }, [data]);

    return (
        <StyledContent style={animation}>
            <p className="orderStatus">Статус заказа: {orderStatus}</p>
            <p className="orderStatus">Статус курьера: {deliveryStatus}</p>
            <div className="orderInfo">
                <span>
                    {data.products.length} товар(а) на {data.price} руб.
                </span>
                <p>
                    Доставка по адресу {data.adress.street}, дом{" "}
                    {data.adress.house_number}
                    {data.adress.entrance ? ", подьезд" : ""}{" "}
                    {data.adress.entrance}
                    {data.adress.flat_number ? ", квартира" : ""}{" "}
                    {data.adress.flat_number}
                </p>
                <StarsContainer>
                    {new Array(5).fill(0).map((i, index) => (
                        <Icons.star key={index} onClick={() => setRating(index + 1)} />
                    ))}
                </StarsContainer>
            </div>
        </StyledContent>
    );
};
