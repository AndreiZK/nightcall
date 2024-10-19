import styled from "styled-components";

const StyledContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100px;
    width: 100px;
    background: linear-gradient(
        90deg,
        rgba(119, 133, 229, 0.3) 0%,
        rgba(90, 9, 122, 0.3) 64%,
        rgba(7, 7, 7, 0.3) 100%
    );
    z-index: -100;
`;

interface GradientCircleProps {
    sizeDesktop: number;
    sizeMobile: number;
    positionDesktop: [number, number];
    positionMobile: [number, number];
    color: string;
}

const GradientCircle = ({
    sizeDesktop,
    sizeMobile,
    positionDesktop,
    positionMobile,
    color,
}: GradientCircleProps) => {
    return <StyledContainer style={{}} />;
};

export default GradientCircle;
