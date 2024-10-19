// export const BASE_API_URL = "http://45.129.186.157:1337/";
// export const BASE_IMAGE_URL = "http://45.129.186.157:1337";
// export const BASE_API_URL = "http://localhost:1337/";
// export const BASE_IMAGE_URL = "http://localhost:1337";
export const BASE_API_URL = "https://api.nightcall.by/";
export const BASE_IMAGE_URL = "https://api.nightcall.by";

export const serviceId = "service_u64lr6h";
export const templateId = "template_r6gjntm";
export const userId = "vxDtk2B-YRXVLjutm";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const requestOptions: any = (raw: any) => {
    return {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
};
