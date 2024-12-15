import styles, { colors, media, rm } from "@/styles";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Icons } from "../UI/Icons";
import { BASE_API_URL } from "../../../constants";
import useStore from "@/store/store";
import { toast } from "react-toastify";

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
    flex-direction: row;

    ${media.xsm`
        margin-left: 0;
    `}

    svg {
        cursor: pointer;
        path {
            fill: grey;
            transition: fill 0.2s ease;
        }

        &.active path {
            fill: ${colors.purple};
        }
    }
`;

const RateContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${rm(46)};
    margin-top: ${rm(22)};
    margin-bottom: ${rm(22)};

    ${media.xsm`
        gap: ${rm(12)};
        margin-top: ${rm(12)};
        margin-bottom: ${rm(12)};
    `}
`;

const StyledRateButton = styled.button`
    background-color: ${colors.purple};
    border-radius: ${rm(6)};
    padding: ${rm(12)} ${rm(24)};
    font-size: ${rm(18)};
    color: ${colors.white100};
    cursor: pointer;

    transition: opacity 0.5s ease;

    ${media.xsm`
        font-size: ${rm(16)};
        padding: ${rm(6)} ${rm(12)};
        width: 46%;
    `}

    &:hover {
        opacity: 0.7;
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

    const [chosenStars, setChosenStars] = useState<number>(0);

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

    const updateRating = async () => {
        const url = `${BASE_API_URL}api/rate`;

        const raw = JSON.stringify({
            order: data.id,
            value: chosenStars,
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

            if(response.ok){
                toast.success("Оценка заведения успешно добавлена");
            } else {
                toast.error("Невозможно повторно оценить заведение");
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            return [];
        }
    };

    useEffect(() => {
        if(data?.star?.value){
            setChosenStars(data.star.value);
        }

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
                <RateContainer>
                    <StarsContainer>
                        {new Array(5).fill(0).map((_, index) => (
                            <Icons.star
                                key={index}
                                className={index < chosenStars ? 'active' : ''}
                                onClick={() => {
                                    setChosenStars(index + 1);
                                }}
                            />
                        ))}
                    </StarsContainer>
                    {!data?.star?.value ? <StyledRateButton onClick={updateRating}>Оценить заведение</StyledRateButton> : <StyledRateButton style={{userSelect: "none", opacity: 0, pointerEvents: "none"}}>Изменить оценку</StyledRateButton>}
                </RateContainer>
            </div>
        </StyledContent>
    );
};
