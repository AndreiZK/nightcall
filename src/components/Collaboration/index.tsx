import styled from "styled-components";
import SectionTitle from "../UI/SectionTitle";
import { media, rm } from "@/styles";
import useStore from "@/store/store";

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${rm(50)};

    p {
        font-size: ${rm(26)};
        max-width: 70%;
        font-weight: 400;
    }

    .cards {
        display: flex;
        gap: ${rm(40)};
        .offer {
            height: ${rm(200)};
            width: ${rm(360)};
            img {
                border-radius: ${rm(24)};
                height: 100%;
                width: 100%;
                object-fit: cover;
                object-position: center 10%;
                cursor: pointer;
            }
        }
    }

    ${media.md`
        gap: ${rm(24)};
        align-items: center;
        p {
        font-size: ${rm(16)};
        max-width: unset;
        width: 88%;
    }
    .cards {
        display: flex;
        flex-direction: column;
        gap: ${rm(16)};
        .offer {
            height: ${rm(200)};
            width: ${rm(360)};
            img {
                border-radius: ${rm(24)};
                height: 100%;
                width: 100%;
                cursor: pointer;
            }
        }
    }
    `}
`;

const Collaboration = () => {
    const setCourierModal = useStore((state: any) => state.setCourierModal);
    const setPartnershipModal = useStore((state: any) => state.setPartnershipModal);

    const data = [
        {
            img: "/images/courier.jpg",
            onClick: () => setCourierModal(true),
        },
    ];

    return (
        <StyledContainer>
            <SectionTitle>Сотрудничество</SectionTitle>
            <p>
                Мы молодая и амбициозная компания и мы с радостью готовы
                сотрудничать с новыми заведениями и людьми!
            </p>
            <div className="cards">
                {/* {data.map((i, index) => (
                    <div className="offer" key={index} >
                        <img onClick={i.onClick} src={i.img} alt="" />
                    </div>
                ))} */}
                <div className="offer" >
                        <img onClick={() => setCourierModal(true)} src='/images/courier.jpg' alt="" />
                    </div>
                    <div className="offer" >
                        <img onClick={() => setPartnershipModal(true)} src='/images/partner.jpg' alt="" />
                    </div>
            </div>
        </StyledContainer>
    );
};

export default Collaboration;
