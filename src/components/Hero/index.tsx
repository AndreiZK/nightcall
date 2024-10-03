import styled from "styled-components";
import Button from "../UI/Button";
import { media, rm } from "@/styles";

const HeroContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left {
        max-width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h1 {
            background: linear-gradient(90deg, #825dd9 0%, #5a097a 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: ${rm(128)};
            font-weight: 600;
        }
        h3 {
            font-size: ${rm(48)};
            font-weight: 400;
            margin-bottom: ${rm(150)};
        }
        button {
            font-size: ${rm(48)};
        }
    }

    .hero-img-desktop {
        width: ${rm(480)};
    }

    .hero-img-mobile {
        display: none;
    }

    ${media.md`
            .hero-img-mobile {
            display: block;
            width: ${rm(300)};
        }
        .hero-img-desktop {
            display: none;
        }
        .left {
            max-width: unset;
            margin-inline: auto;
            width: ${rm(300)};
            justify-content: start;
            h1 {
            
            font-size: ${rm(52)};
            font-weight: 600;
        }
        h3 {
            font-size: ${rm(22)};
            font-weight: 400;
            margin-bottom: ${rm(28)};
        }
        button {
            font-size: ${rm(30)};
            width: 100%;
            margin-top: ${rm(80)};
        }
        }
    `}
`;

const Hero = () => {
    return (
        <HeroContainer>
            <div className="left">
                <h1>NIGHTCALL</h1>
                <h3>Первая ночная доставка еды в Гродно!</h3>
                <img
                    className="hero-img-mobile"
                    src="/images/ryan.png"
                    alt=""
                />
                <div className="button-container">
                    <Button>Заказать</Button>
                </div>
            </div>
            <img className="hero-img-desktop" src="/images/ryan.png" alt="" />
        </HeroContainer>
    );
};

export default Hero;
