"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidName = exports.isValidRole = exports.isValidPassword = exports.isValidEmail = void 0;
const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-](\.?[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])*@[a-zA-Z0-9](\.?[a-zA-Z0-9])*\.[a-zA-Z0-9][a-zA-Z0-9]+$/;
const nameRegex = /^[a-zA-Z]+([- '][a-zA-Z]+)*$/;
const roleRegex = /^admin|delivery|client$/;
function isValidEmail(email) {
    return emailRegex.test(email);
}
exports.isValidEmail = isValidEmail;
function isValidPassword(password) {
    if (password.length < 8)
        return false;
    else if (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[%@*!?&]/.test(password))
        return false;
    return true;
}
exports.isValidPassword = isValidPassword;
function isValidRole(role) {
    return roleRegex.test(role);
}
exports.isValidRole = isValidRole;
function isValidName(name) {
    if (name.length < 1)
        return false;
    return nameRegex.test(name);
}
exports.isValidName = isValidName;
//# sourceMappingURL=regex.js.map