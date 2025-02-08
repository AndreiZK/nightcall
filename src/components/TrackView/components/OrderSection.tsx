import { colors, media, rm } from "@/styles";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { animated, easings, useSpring, useSpringRef, useChain } from "@react-spring/web";
import { fontNotoSans } from "@/styles/fonts";

interface OrderSectionProps {
    data: any;
}

export const OrderSection = ({ data }: OrderSectionProps) => {
    const ref = useRef<any>(null);

    const [hours, setHours] = useState<string>("");
    const [minutes, setMinutes] = useState<string>("");
    const [currentSection, setCurrentSection] = useState(0);
    const [currentStatus, setCurrentStatus] = useState<string>("");
    
    useEffect(() => {
        const date = new Date(data.createdAt);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        setHours(hours);
        setMinutes(minutes);
    }, [data]);

    useEffect(() => {
        if(data.merchant_status === 'decline'){
            setCurrentSection(0)
            setCurrentStatus('Отклонён заведением')
            return
        }

        if(data.merchant_status === 'waiting') {
            setCurrentSection(0)
            setCurrentStatus('Ожидаем ответ от заведения')
        }
        else if (data.merchant_status === 'cooking') {
            setCurrentSection(0)
            setCurrentStatus('Заказ готовится')
        }
        else if (data.merchant_status === 'ready' && data.courier_status != 'delivering' && data.courier_status != 'on_place') {
            setCurrentSection(1)
            setCurrentStatus('Заказ готов')
        }
        else if (data.courier_status === 'delivering' || data.courier_status === 'accepted' || data.courier_status === 'searching') {
            setCurrentSection(2)
            setCurrentStatus('Заказ доставляется')
        }
        else if (data.courier_status === 'on_place') {
            setCurrentSection(3)
            setCurrentStatus('Заказ доставлен')
        } 
    }, [data, currentSection]);

    const rocketSpring = useSpring({
        from: { left: '0%' },
        to: [
            { left: '100%' },
            { left: '0%' }
        ],
        config: { duration: 3000 },
        loop: true,
    });

    return (
        <StyledAccordion ref={ref}>
            <StyledWrapper>
                <StyledQuestion>
                     <p><span>Заказ из </span> {data.products[0].product.merchant.name} №{data.id} в {hours}:{minutes}</p>
                </StyledQuestion>
                <StyledTrackingContainer>
                    <p className="title" style={{color: currentStatus === 'Отклонён заведением' ? 'red' : 'white'}}>{currentStatus}</p>
                    {currentStatus !== 'Отклонён заведением' && <div className="sections">
                        {[0, 1, 2, 3].map((section) => (
                            <SectionContainer key={section}>
                                <div
                                    style={{
                                        backgroundColor: section < currentSection ? colors.white100 : 'transparent',
                                        borderColor: colors.white100,
                                    }}
                                />
                                {currentSection === section && (
                                    <AnimatedRocket style={rocketSpring}>
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="14.5" cy="14.5" r="14.5" fill="white"/>
                                            <rect width="17" height="17" transform="translate(5 7)" fill="white"/>
                                            <path d="M11.3986 11.225L9.59724 13.021C9.26613 13.3511 8.96239 13.654 8.72252 13.9277C8.56848 14.1035 8.41454 14.2959 8.28415 14.5085L8.2666 14.491C8.23328 14.4578 8.21661 14.4411 8.19988 14.4249C7.88677 14.1211 7.51847 13.8796 7.11469 13.7132C7.09311 13.7043 7.07121 13.6956 7.02741 13.6783L6.7592 13.572C6.39585 13.428 6.29901 12.9603 6.57549 12.6846C7.36897 11.8936 8.32166 10.9438 8.78143 10.753C9.18691 10.5848 9.62493 10.5288 10.0474 10.5912C10.4345 10.6484 10.8006 10.8472 11.3986 11.225Z" fill="black"/>
                                            <path d="M14.4746 20.6809C14.6197 20.8282 14.7162 20.9323 14.8033 21.0435C14.9183 21.1902 15.0212 21.3461 15.1108 21.5094C15.2116 21.6934 15.29 21.8899 15.4467 22.2829C15.5742 22.6028 15.9979 22.6874 16.244 22.442L16.3035 22.3827C17.0969 21.5915 18.0496 20.6417 18.2409 20.1834C18.4097 19.779 18.4658 19.3424 18.4032 18.9212C18.3458 18.5353 18.1465 18.1703 17.7676 17.5742L15.9602 19.3762C15.6215 19.7138 15.3111 20.0234 15.0303 20.2659C14.862 20.4112 14.6779 20.5565 14.4746 20.6809Z" fill="black"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.2338 18.6016L19.3753 14.4725C19.9718 13.8779 20.27 13.5806 20.4271 13.2025C20.5842 12.8244 20.5842 12.4039 20.5842 11.5629V11.1612C20.5842 9.86802 20.5842 9.22144 20.1812 8.8197C19.7783 8.41797 19.1298 8.41797 17.8327 8.41797H17.4298C16.5863 8.41797 16.1645 8.41797 15.7853 8.57458C15.406 8.73119 15.1078 9.02852 14.5114 9.62317L10.3699 13.7523C9.67293 14.4471 9.24079 14.878 9.07345 15.2941C9.02058 15.4256 8.99414 15.5556 8.99414 15.692C8.99414 16.2601 9.45272 16.7174 10.3699 17.6318L10.4931 17.7547L11.9371 16.2892C12.143 16.0802 12.4794 16.0777 12.6884 16.2836C12.8973 16.4895 12.8998 16.8259 12.6939 17.0349L11.2456 18.5048L11.3427 18.6016C12.2598 19.5161 12.7184 19.9732 13.2883 19.9732C13.4141 19.9732 13.5346 19.9509 13.6558 19.9063C14.0832 19.7489 14.5194 19.314 15.2338 18.6016ZM17.1795 13.7526C16.6422 14.2882 15.7712 14.2882 15.2339 13.7526C14.6966 13.2169 14.6966 12.3485 15.2339 11.8128C15.7712 11.2772 16.6422 11.2772 17.1795 11.8128C17.7168 12.3485 17.7168 13.2169 17.1795 13.7526Z" fill="black"/>
                                        </svg>
                                    </AnimatedRocket>
                                )}
                            </SectionContainer>
                        ))}
                    </div>}
                </StyledTrackingContainer>
                <StyledDivider />
                {currentStatus !== 'Отклонён заведением' && <StyledInfo>
                    <p>{data?.products.length} {
                        data?.products.length % 10 === 1 && data?.products.length % 100 !== 11 
                            ? 'товар' 
                            : (data?.products.length % 10 >= 2 && data?.products.length % 10 <= 4 && 
                               (data?.products.length % 100 < 10 || data?.products.length % 100 >= 20)) 
                                ? 'товара' 
                                : 'товаров'
                    } на сумму {data?.payment.price} BYN.</p>
                    <span>Доставка по адресу: Гродно, {data?.adress?.street}, {data?.adress?.house_number} {data?.adress?.flat_number ? `, кв. ${data?.adress?.flat_number}` : ""}</span>
                </StyledInfo>}
                {currentStatus === 'Отклонён заведением' && <StyledInfo>
                    <p>Добрейшего! Извиняемся за данную ситуацию, скоро с вами свяжется наш администратор 😎</p>
                    <span><span style={{color: colors.purple}}>Почта для связи: </span><span style={{fontStyle: 'italic'}}>nightcallgrodno@gmail.com</span></span>
                </StyledInfo>}
                <StyledDivider />
            </StyledWrapper>
        </StyledAccordion>
    );
};



const StyledAccordion = styled.div`
    width: 100%;
    position: relative;
    margin-top: ${rm(50)};
`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    position: relative;
    z-index: 100;

    padding-block: ${rm(12)};
    padding-inline: ${rm(12)};
    border-radius: ${rm(6)};
`;

const StyledQuestion = styled.div`
    color: ${colors.white100};
    margin-bottom: ${rm(50)};
    
    p{
       font-size: ${rm(32)};
       ${fontNotoSans(400)};

       span{
          color: ${colors.purple};
       }
    }
`;

const StyledInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${rm(20)};
    margin-top: ${rm(40)};
    margin-bottom: ${rm(40)};

    p{
        font-size: ${rm(24)};
        ${fontNotoSans(400)};
        color: ${colors.white100};
    }

    span{
        color: ${colors.white100};
        font-size: ${rm(20)};
        ${fontNotoSans(400)};
`

const StyledDivider = styled.div`
    width: 100%;
    height: ${rm(1)};
    background-color: ${colors.white100};
    opacity: 0.2;
`

const StyledTrackingContainer = styled.div`
    display: flex;
    flex-direction: column;

    .title{
        font-size: ${rm(36)};
        ${fontNotoSans(400)};
        color: ${colors.white100};
        margin-bottom: ${rm(40)};
    }

    .sections{
        gap: ${rm(20)};
        display: flex;
        margin-bottom: ${rm(65)};
        width: 100%;
        
        ${media.xsm`
            gap: ${rm(20)};
            margin-bottom: ${rm(20)};
        `}
    }
`

const SectionContainer = styled.div`
    position: relative;
    flex: 1;
    
    div {
        height: ${rm(4)};
        border-radius: ${rm(10)};
        border: ${rm(1)} solid ${colors.white100};
        width: 100%;
    }
`;

const AnimatedRocket = styled(animated.span)`
    width: ${rm(29)};
    height: ${rm(29)};
    background-color: ${colors.white100};
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;

    ${media.xsm`
        width: ${rm(20)};
        height: ${rm(20)};
    `}

    svg {
        width: 100%;
        height: 100%;
    }
`;
