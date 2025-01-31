const setCookie = (name: string, value: string, days: number = 1) => {
    document.cookie = `${name}=${value};`;
};

const removeCookie = (name: string) => {
    document.cookie = `${name}=;`;
};

const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue || null;
        }
    }
    return null;
};

export { setCookie, removeCookie, getCookie };