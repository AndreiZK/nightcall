import Layout from "@/components/Layout";
import Breadcrumb from "@/components/UI/Breadcrumb";
import { colors, media, rm } from "@/styles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "@/components/UI/ProductCard";
import { Icons } from "@/components/UI/Icons";
import { useRouter } from "next/router";
import { getProductsFromMerchant } from "@/requests/getProductsFromMerchant";
import {
    ICategory,
    IProduct,
    IRestaurant,
    IRestaurantData,
} from "../../../types";
import { BASE_IMAGE_URL } from "../../../constants";
import { getStrapiData } from "@/requests/getStrapiData";

const StyledContainer = styled.div`
    width: 100%;
    display: grid;
    gap: ${rm(12)};
    grid-template-columns: repeat(12, 1fr);
    margin-top: ${rm(34)};
    margin-bottom: ${rm(100)};

    ${media.md`
        display: flex;
        flex-direction: column;
    `}

    .top-bar,
    .cart,
    .categories {
        background: #d9d9d90c;
        border-radius: ${rm(8)};

        ${media.md`
            border-radius: ${rm(4)};
            `}
    }

    .top-bar {
        grid-column: 1 / 10;
        border-top-left-radius: ${rm(24)};
        display: flex;
        align-items: center;
        gap: ${rm(16)};
        height: ${rm(115)};
        overflow: hidden;

        img {
            height: 100%;
        }

        h2 {
            font-size: ${rm(48)};
            font-weight: 400;
        }

        ${media.md`
            border-top-left-radius: ${rm(12)};
            border-top-right-radius: ${rm(12)};
            height: ${rm(50)};

            h2 {
                font-size: ${rm(24)};
            }
            `}
    }

    .cart {
        grid-column: 10 / 13;
        grid-row: 1/ 3;
        height: ${rm(450)};
        border-top-right-radius: ${rm(24)};
        position: sticky;
        align-self: start;
        top: ${rm(140)};
        left: 0;
        padding: ${rm(20)} ${rm(14)};

        .cart-title {
            font-size: ${rm(30)};
            color: ${colors.purple};
        }

        .cart-empty {
            margin-top: 300px;
            font-size: ${rm(16)};
        }

        .bag {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        ${media.md`
            display: none;
        `}
    }

    .categories {
        position: sticky;
        align-self: start;
        top: ${rm(140)};
        left: 0;
        display: flex;
        flex-direction: column;
        gap: ${rm(30)};
        padding: ${rm(24)} ${rm(30)};
        grid-column: 1 / 4;
        a {
            text-decoration: none;
            cursor: pointer;
            font-size: ${rm(24)};
            &.selected {
                color: ${colors.purple};
            }
        }

        ${media.md`
                flex-direction: row;
                overflow: scroll;
                gap: ${rm(10)};
        padding: ${rm(4)} ${rm(8)};
        font-size: ${rm(24)};
        font-weight: 300;
            `}
    }

    .products {
        grid-column: 4 / 10;
        display: flex;
        flex-direction: column;
        gap: ${rm(12)};

        .category {
            scroll-margin-top: ${rm(140)};
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: ${rm(8)};
            .category-title {
                font-size: ${rm(24)};
            }
            .items {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-auto-rows: ${rm(340)};
                gap: ${rm(8)};
                ${media.md`
            grid-template-columns: 1fr 1fr;
            gap: ${rm(20)};
            grid-auto-rows: ${rm(230)};
        `}
            }
        }
    }
`;

export default function RestaurantPage() {
    const [merchantData, setMerchantData] = useState<IRestaurant | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isOpened, setIsOpen] = useState<boolean>(false);

    const router = useRouter();
    const { id } = router.query;

    async function fetchData() {
        const products: IProduct[] = await getProductsFromMerchant(id);
        const merchant: { data: IRestaurant } = await getStrapiData(
            `merchants/${id}`
        );
        console.log(merchant.data);
        console.log(products);
        if (products && products.length) {
            setMerchantData(merchant.data);
            setProducts(products);
            setLoaded(true);
            setSelectedCategory(
                merchantData?.attributes.categories.categories[0]
            );
        }
    }

    console.log(id);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <Breadcrumb />
            {loaded && (
                <StyledContainer>
                    <div className="top-bar">
                        <img
                            src={
                                BASE_IMAGE_URL +
                                merchantData?.attributes.preview_image.data[0]
                                    .attributes.url
                            }
                            alt=""
                        />
                        <h2>{merchantData?.attributes.name}</h2>
                    </div>
                    <div className="cart">
                        <span className="cart-title">Ваш заказ</span>
                        <Icons.cartDesktop className="bag" />
                        <span className="cart-empty">
                            Вы еще ничего не выбрали. Когда вы добавите товар,
                            он появится здесь!
                        </span>
                    </div>
                    <div className="categories">
                        {merchantData?.attributes.categories.categories.map(
                            (i, index) => (
                                <a
                                    href={`#${i.category}`}
                                    className={
                                        i === selectedCategory ? "selected" : ""
                                    }
                                    onClick={() => setSelectedCategory(i)}
                                    key={index}
                                >
                                    {i.title}
                                </a>
                            )
                        )}
                    </div>
                    <div className="products">
                        {merchantData?.attributes.categories.categories &&
                            merchantData?.attributes.categories.categories.map(
                                (category: ICategory, index: number) => (
                                    <div
                                        className="category"
                                        id={category.category}
                                    >
                                        <p className="category-title">
                                            {category.title}
                                        </p>
                                        <div className="items">
                                            {products.map(
                                                (
                                                    product: IProduct,
                                                    index: number
                                                ) =>
                                                    !product?.blocked &&
                                                    product.stoplist_timestamp *
                                                        1000 <
                                                        Date.now() &&
                                                    product.category ===
                                                        category.category && (
                                                        <ProductCard
                                                            {...product}
                                                        />
                                                    )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                </StyledContainer>
            )}
        </Layout>
    );
}
