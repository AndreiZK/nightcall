"use client";

import { Children, ReactNode, useState } from "react";
import styled from "styled-components";

const StyledSlider = styled.div`
    width: 100%;

    .dots {
    }
`;

interface SliderProps {
    children: ReactNode;
    slidesPerPage: number;
    slidesToShow: number;
    slidesToShowMobile: number;
    slidesPerMobilePage: number;
    dots: boolean;
    arrows: boolean;
}

const Slider = ({
    children,
    slidesPerPage,
    slidesPerMobilePage,
    slidesToShow,
    slidesToShowMobile,
    dots,
    arrows,
}: SliderProps) => {
    //slidesToShow means how much new slides will be shown on a page turn

    const slidesCount = Children.toArray(children).length;
    const pagesCount = Math.ceil(slidesCount / slidesToShow);

    const [currentPage, setCurrentPage] = useState(0);
    const [currentSlides, setCurrentSlides] = useState<ReactNode[]>(
        Children.map(
            children,
            (child, index) => index - currentPage * slidesToShow
        )
    );

    const handleNext = () => {
        if (currentPage + 1 >= pagesCount) {
            setCurrentPage(0);
            return;
        }
        setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage - 1 < 0) {
            setCurrentPage(pagesCount - 1);
            return;
        }
        setCurrentPage(currentPage - 1);
    };

    return (
        <StyledSlider>
            <div className="dots"></div>
        </StyledSlider>
    );
};

export default Slider;
