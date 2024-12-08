import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Icons } from "../Icons";
import { colors, rm } from "@/styles";
import Link from "next/link";

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

const breadcrumbMap: Record<string, string> = {
    "/": "Главная",
    "restaurants": "Рестораны",
    "1": "Галактика",
    "2": "Harat's",
    "3": "СОН", 
    "4": "Мистерия",
    "5": "test_merch",
    "6": "Биг джонс",
    "7": "Shaw_box"
};

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathParts = pathname?.split("/").filter(Boolean);
    
    // Build breadcrumb items with their full paths
    const breadcrumbItems = pathParts?.map((part, index) => {
        const path = "/" + pathParts.slice(0, index + 1).join("/");
        return {
            title: breadcrumbMap[part] || part,
            path
        };
    }) || [];

    // Add home as first item
    breadcrumbItems.unshift({
        title: "Главная",
        path: "/"
    });

    return (
        <StyledBreadcrumb>
            {breadcrumbItems.map((item, index) =>
                index === breadcrumbItems.length - 1 ? (
                    <span key={item.path}>{item.title}</span>
                ) : (
                    <>
                        <Link href={item.path} key={item.path}>
                            {item.title}
                        </Link>
                        <Icons.chevroneRight />
                    </>
                )
            )}
        </StyledBreadcrumb>
    );
};

export default Breadcrumb;
