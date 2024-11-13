import { colors, media, rm } from "@/styles"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ContentAccordion } from "./ContentAccordion"
import { animated, easings, useSpring } from "@react-spring/web"

const StyledAccordion = styled.div`
    width: 100%;
    position: relative;
    transition: background-color .2s ease-in-out, transform .25s ease;
`

const StyledWrapper = styled.div`
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    width: 100%;
    position: relative;
    z-index: 100;
`

const StyledQuestion = styled.div`
    font-size: ${rm(24)};
    color: ${colors.white100};
    padding-bottom: ${rm(24)};
    width: 90%;

    ${media.lg`
        font-size: ${rm(22)};
    `}

    ${media.xsm`
        font-size: ${rm(14)};
        width: 100%; 
        padding-bottom: ${rm(8)};   
    `}
`

const StyledPlusContainer = styled.div`
    position: relative;
	width: ${rm(18)};
	height: ${rm(18)};
	cursor: pointer;
    margin-top: ${rm(7)};
	
    ${media.xsm`
        width: ${rm(14)};
        height: ${rm(14)};
        margin-top: ${rm(5)};  
    `}

	&.active {
		&:before {
			transform: translatey(-50%) rotate(-90deg);
			opacity: 0;
		}
		&:after {
			transform: translatey(-50%) rotate(0);
		}
	}
	
	.first, .second {
		content: "";
		display: block;
		background-color: ${colors.black100};
		position: absolute;		
		top: 50%; left: 0;
		width: 100%;
		height: ${rm(2)};

        transition: transform .35s, opacity .35s;
	}
	
	.first {		
		transform: translatey(-50%);
	}
	
	.second {
		transform: translatey(-50%) rotate(90deg);
	}
`


interface AccordionProps {
    data: any,
    index: number,
    activeIndex: number,
    setActiveIndex: (index: number) => void,
}

export const Accordion = ({data, index, activeIndex, setActiveIndex}: AccordionProps) => {

    const ref = useRef<any>(null)
    const [height, setHeight] = useState(0)

    const [hours, setHours] = useState<string>("")
    const [minutes, setMinutes] = useState<string>("")

    useEffect(() => {
      let heightContent = ref?.current?.offsetHeight;
      setHeight(heightContent)
    },[ref])

    const firstSpring = useSpring({
        transform: activeIndex == index ? 'translatey(-50%) rotate(-90deg)' : 'translatey(-50%) rotate(0deg)',
        opacity: activeIndex == index ? 0 : 1,
        config: { duration: 100, easing: easings.easeInOutCubic },
    })

    const secondSpring = useSpring({
        transform: activeIndex == index ? 'translatey(-50%) rotate(0)' : 'translatey(-50%) rotate(90deg)',
        config: { duration: 100, easing: easings.easeInOutCubic },
    })

    useEffect(() => {
        const date = new Date(data.createdAt);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        setHours(hours)
        setMinutes(minutes)
    }, [data])

    return(
        <StyledAccordion ref={ref}>
            <StyledWrapper onClick={() => {
                if(activeIndex === index) {
                    setActiveIndex(-1)
                } else {
                    setActiveIndex(index)
                }
            }}>
                <StyledQuestion>
                    <span className='green'>Заказ</span> номер{" "}
                    <span className='underline'>{data.id}</span> в {hours}:{minutes}
                </StyledQuestion>
                <StyledPlusContainer>
                    <animated.div className='first' style={firstSpring}></animated.div>
                    <animated.div className='second' style={secondSpring}></animated.div>
                </StyledPlusContainer>
            </StyledWrapper>
            <ContentAccordion activeIndex={activeIndex} index={index} height={height} data={data}/>
        </StyledAccordion>
    )
}