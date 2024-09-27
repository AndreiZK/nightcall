import { redirect } from "next/navigation";
import styled from "styled-components";

const StyledSliderItem = styled.div`
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }
`;

interface SliderItemProps {
    imageSrc: string;
    href?: string;
}

export const SliderItem = ({ imageSrc, href }: SliderItemProps) => {
    const handleClick = () => {
        if (!href) return;
        redirect(href);
    };

    return (
        <StyledSliderItem onClick={handleClick}>
            <img src={imageSrc} alt="" />
        </StyledSliderItem>
    );
};
