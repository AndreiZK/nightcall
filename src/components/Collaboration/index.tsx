import styled from "styled-components";
import SectionTitle from "../UI/SectionTitle";
import { media, rm } from "@/styles";

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
        a {
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
        a {
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
    return (
        <StyledContainer>
            <SectionTitle>Сотрудничество</SectionTitle>
            <p>
                Мы молодая и амбициозная компания и мы с радостью готовы
                сотрудничать с новыми заведениями и людьми!
            </p>
            <div className="cards">
                {new Array(2).fill(0).map((i, index) => (
                    <a key={index} href="/">
                        <img
                            src="https://loremflickr.com/cache/resized/65535_53837803942_3ca28590ae_n_200_200_nofilter.jpg"
                            alt=""
                        />
                    </a>
                ))}
            </div>
        </StyledContainer>
    );
};

export default Collaboration;
