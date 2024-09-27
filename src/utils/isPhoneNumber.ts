export const isPhoneNumber = (str: string) => {
    // Regular expression pattern for detecting phone numbers (supports sequences of digits)
    var phonePattern = /\d{5,}/;
    return phonePattern.test(str);
}