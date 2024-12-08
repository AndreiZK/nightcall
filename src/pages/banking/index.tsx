import Layout from "@/components/Layout";
import { colors, rm } from "@/styles";
import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${rm(20)};
    justify-content: center;
    align-items: center;
    text-align: center;

    .title {
        font-size: ${rm(36)};
        font-weight: bold;
        color: ${colors.purple};
        margin-bottom: ${rm(10)};
        width: 40%;
    }

    .banking-content {
        width: 40%;
    }
`;

export default function page() {
    return (
        <Layout>
        <StyledContainer>
      <h2 className="title">Банковские реквизиты</h2>
      <div className="banking-content">
        ООО Найтколл Адрес: 230001, Республика Беларусь, Г. Гродно, Ул.
        Титова, 24 IBAN BY45ALFA30122E40960010270000 Банк: ОАО «Альфа-Банк», Г.
        Минск УНП 591046348, Гродненский Горисполком, 26.12.2023 Дата
        Регистрации В Торговом Реестре 17.01.2024
      </div>
      </StyledContainer>
      </Layout>
    )
}