import { rm } from "@/styles";
import { colors } from "@/styles/colors";
import { fontOnest } from "@/styles/fonts";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BASE_API_URL } from "../../../constants";
import useStore from "@/store/store";
import { OrderSection } from "./components/OrderSection";

export default function TrackView() {

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
                    .sort((a: any, b: any) => b.id - a.id);
                setDataToRender(reversedArray);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        findActiveOrders();

        const interval = setInterval(() => {
            findActiveOrders();
        }, 300000);

        return () => clearInterval(interval);
    }, [jwt]);

    return (
        <StyledTrackView>
            <StyledTrackViewHeader>
                <StyledTitle>Активные заказы</StyledTitle>
                <StyledMainDivider />
                {dataToRender.map((item: any) => (
                    <OrderSection data={item} key={item.id} />
                ))}
            </StyledTrackViewHeader>
        </StyledTrackView>
    );
}

const StyledTrackView = styled.div`
    width: 100%;
    height: 100%;
`;

const StyledTrackViewHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledTitle = styled.h1`
    font-size: ${rm(48)};
    ${fontOnest(400)};
`

const StyledMainDivider = styled.div`
    width: 100%;
    height: ${rm(3)};
    border: ${rm(0.5)} solid ${colors.white100};
    margin-top: ${rm(50)};
    border-radius: ${rm(10)};
`
