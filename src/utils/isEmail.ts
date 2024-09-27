export const isEmail = (str: string) => {
    // Regular expression pattern for validating email addresses
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(str);
}