import * as api from './api.js';
import { clearUserData, setUserData } from '../util.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export async function login(email, password) {
    // API метода ни е така (виж api) , че ако има грешка ще я хвърлим и при положение , че тук сме дали await promise rejection`а ще предизвика тази функция да работи и което е надолу няма да се изпълни.
    const result = await api.post(endpoints.login, { email, password });
    setUserData(result);

    return result;
}

export async function register(email, password) {
    const result = await api.post(endpoints.register, { email, password });
    setUserData(result);

    return result;
}

export async function logout() {
    api.get(endpoints.logout);
    clearUserData();
}