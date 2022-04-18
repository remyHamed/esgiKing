const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-](\.?[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])*@[a-zA-Z0-9](\.?[a-zA-Z0-9])*\.[a-zA-Z0-9][a-zA-Z0-9]+$/

export function isValidEmail(email: string) {
    return emailRegex.test(email);
}

export function isValidPassword(password: string) {
    const passwords = require('popular-passwords');

    console.log(passwords);
    return true;
}