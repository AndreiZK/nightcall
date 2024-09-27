import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Icons } from "../Icons";
import { colors, rm } from "@/styles";

const StyledBreadcrumb = styled.div`
    display: flex;
    gap: ${rm(14)};
    align-items: center;
    font-weight: 600;

    span {
        color: ${colors.white100};
        opacity: 50%;
    }

    a {
        color: ${colors.purple};
        cursor: pointer;
    }
`;

const breadcrumbMap = {
    "/": "Главная",
    restaurants: "Рестораны",
};

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/").filter(Boolean);
    //@ts-ignore
    const breadcrumbItems = pathParts.map((part, index) => breadcrumbMap[part]);
    breadcrumbItems.unshift("Главная");

    console.log(breadcrumbItems);
    return (
        <StyledBreadcrumb>
            {breadcrumbItems.map((item, index) =>
                index === breadcrumbItems.length - 1 ? (
                    <span>{item}</span>
                ) : (
                    <>
                        <a href="/">{item}</a>
                        <Icons.chevroneRight />
                    </>
                )
            )}
        </StyledBreadcrumb>
    );
};

export default Breadcrumb;
