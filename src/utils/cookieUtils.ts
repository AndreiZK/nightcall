const setCookie = (name: string, value: string, days: number = 1) => {
    const domain = window.location.hostname;
    document.cookie = `${name}=${value}; max-age=${days * 86400}; path=/; domain=${domain}; secure; samesite=strict`;
};

const removeCookie = (name: string) => {
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}; secure; samesite=strict`;
    // Also try without domain for local development
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
};

export { setCookie, removeCookie };