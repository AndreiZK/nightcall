import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Icons } from "../Icons";
import { colors, rm } from "@/styles";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getStrapiData } from "@/requests/getStrapiData";
import { IRestaurant } from "../../../../types";

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

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathParts = pathname?.split("/").filter(Boolean);
    const [restaurants, setRestaurants] = useState<{[key: string]: string}>({
        "/": "Главная",
        "restaurants": "Рестораны"
    });

    useEffect(() => {
        const fetchRestaurants = async () => {
            const { data } = await getStrapiData("merchants");
            const restaurantMap = { ...restaurants };
            
            data.forEach((restaurant: IRestaurant) => {
                restaurantMap[restaurant.id.toString()] = restaurant.attributes.name;
            });
            
            setRestaurants(restaurantMap);
        };

        fetchRestaurants();
    }, []);
    
    const breadcrumbItems = pathParts?.map((part, index) => {
        const path = "/" + pathParts.slice(0, index + 1).join("/");
        return {
            title: restaurants[part] || part,
            path
        };
    }) || [];

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
                        <a href={item.path} key={item.path}>
                            {item.title}
                        </a>
                        <Icons.chevroneRight />
                    </>
                )
            )}
        </StyledBreadcrumb>
    );
};

export default Breadcrumb;
