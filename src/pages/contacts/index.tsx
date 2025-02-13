import Layout from "@/components/Layout";
import styled from "styled-components";
import {colors, rm} from '@/styles/index'
import { useLoadingReady } from "@/hooks/useLoadingReady";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${rm(20)};

    .title {
        font-size: ${rm(36)};
        font-weight: bold;
        color: ${colors.purple};
        margin-bottom: ${rm(10)};
    }
`;

export default function page() {

  useLoadingReady(true)

  return (
    <Layout>
      <div className="contacts-container">
      <h2 className="title">Контакты</h2>
      <div className="contacts">
        <div>
          <p>Почта - nightcallgrodno@gmail.com</p>
        </div>
        <div>
          <p>Телефон - +375291926440</p>
          <span>*Прием звонков с 11.00 до 18.00</span>
        </div>
        <div>
          <p>Адрес - Г. Гродно, Ул. Титова, 24</p>
        </div>
      </div>
    </div>
    </Layout>
  )
}