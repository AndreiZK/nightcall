const setCookie = (name: string, value: string, days: number = 1) => {
    document.cookie = `${name}=${value};`;

    console.log('settedCookies' ,document.cookie)
};

const removeCookie = (name: string) => {
    document.cookie = `${name}=;`;

    console.log('removedCookies' ,document.cookie)
    // Also try without domain for local development
    // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
};

export { setCookie, removeCookie };