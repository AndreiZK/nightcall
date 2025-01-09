import { BASE_API_URL } from "../../constants";

if (!BASE_API_URL) {
    throw new Error("BASE_API_URL is not defined");
}

export default function getApiUrl(uri: any) {
    return new URL(uri, BASE_API_URL);
}
