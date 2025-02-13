import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import styled from "styled-components";
import { colors, media, rm } from "@/styles";
import ModalTitle from "./ModalTitle";
import useStore from "../../../store/store";
import { BASE_API_URL } from "../../../../constants";
import { Accordion } from "@/components/Modals/Accordion";

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

const MyOrdersModal = () => {
    const setModal = useStore((state: any) => state.setModal);
    const activeModal = useStore((state: any) => state.activeModal);
    const setTrackOpen = useStore((state: any) => state.setTrackOpen);
    const isTrackOpen = useStore((state: any) => state.isTrackOpen);
    const jwt = useStore((state: any) => state.jwtToken);

    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [dataToRender, setDataToRender] = useState<any>([]);

    const handleClose = () => {
        setModal(null);
    };

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
    }, [jwt]);

    useEffect(() => {
        if (activeModal === 'track') {
            // Logic to execute when the modal is opened
        }
    }, [activeModal]);

    return (
        isTrackOpen && (
            <BaseModal isOpen={isTrackOpen} onClose={handleClose}>
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
                </StyledContainer>
            </BaseModal>
        )
    );
};

export default MyOrdersModal;
