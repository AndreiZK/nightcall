export const isInstagram = () => {
    // @ts-expect-error
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf('Instagram') > -1) ? true : false;
}