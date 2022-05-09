const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-](\.?[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])*@[a-zA-Z0-9](\.?[a-zA-Z0-9])*\.[a-zA-Z0-9][a-zA-Z0-9]+$/;
const nameRegex = /^[a-zA-Z]+([- '][a-zA-Z]+)*$/;
const roleRegex = /^admin|delivery|customer$/;
const gpsRegex = /^\d+[.]\d+[,]\d+[.]\d+$/;


export function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
    if(password.length < 8)
        return false;

    else if(!/[A-Z]/.test(password))
        return false;

    else if(!/[a-z]/.test(password))
        return false;

    else if(!/[0-9]/.test(password))
        return false;

    else if(!/[%@*!?&]/.test(password))
        return false;

    return true;
}

export function isValidRole(role: string): boolean {
    return roleRegex.test(role);
}

export function isValidName(name: string) {
    if(name.length > 255)
        return false

    return nameRegex.test(name);
}

export function isValidGPSFomrat(coordinates: string): boolean {
    return gpsRegex.test(coordinates);
}