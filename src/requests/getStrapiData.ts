import { BASE_API_URL } from "../../constants";

export async function getStrapiData(link: string) {
    const urlWithParams = `${BASE_API_URL}api/${link}?populate=*`;

    try {
        const response = await fetch(urlWithParams, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return "fuck u";
    }
}

export async function getUnPopulateStrapiData(link: string, id: number) {
    const urlWithParams = `${BASE_API_URL}api/${link}/${id}?populate=*`;

    try {
        const response = await fetch(urlWithParams, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return "fuck u";
    }
}
