import styled from "styled-components"

export const SquareLoader = (props: any) => {
    const StyledLoader = styled.div`
    width: var(--size-loader, 1.25em);
    height: var(--size-loader, 1.25em);
    display: inline-block;
    position: relative;
    &::after,
    &::before {
        content: '';  
        box-sizing: border-box;
        width: var(--size-loader, 1.25em);
        height: var(--size-loader, 1.25em);
        border: 1px solid transparent;
        position: absolute;
        left: 0;
        top: 0;
        animation: rotationBreak 3s ease-in-out infinite alternate;
    }
    &::before {
        border-color: var(--color-loader-1, white);
    }
    &::after {
        border-color: var(--color-loader-2, white);
        animation-direction: alternate-reverse;
    }
    
    @keyframes rotationBreak {
        0% {
        transform: rotate(0);
        }
        25% {
        transform: rotate(90deg);
        }
        50% {
        transform: rotate(180deg);
        }
        75% {
        transform: rotate(270deg);
        }
        100% {
        transform: rotate(360deg);
        }
  }
    `

    return <StyledLoader {...props} />
}