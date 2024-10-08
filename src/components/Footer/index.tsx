import { colors, media, rm } from "@/styles";
import styled from "styled-components";

const StyledFooter = styled.footer`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${rm(10)};
    background: rgba(255, 255, 255, 0.05);
    padding-block: ${rm(37)};

    .links {
        display: flex;
        gap: ${rm(32)};
        justify-content: center;
        a {
            font-size: ${rm(20)};
            color: ${colors.white100};
            text-decoration: none;
        }
    }

    img {
        max-width: ${rm(1320)};
    }

    ${media.md`

        padding-block: ${rm(16)};
        
        img {
            max-width: 100%;
        }

        .links {
            width: 90%;
            display: flex;
            gap: ${rm(16)};
            justify-content: space-between;
            a {
                font-size: ${rm(12)};
                color: ${colors.white100};
                text-decoration: none;
            }
        }
    `}
`;

const Footer = () => {
    return (
        <StyledFooter>
            <div className="links">
                {new Array(5).fill(0).map((i, index) => (
                    <a key={index} href="/">
                        Какая-то ссылка
                    </a>
                ))}
            </div>
            <img src="/images/footer-image.png" alt="" />
        </StyledFooter>
    );
};

export default Footer;
