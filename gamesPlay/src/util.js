// Функция която връща целия user обект
export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}
// Функция която връща access token от целия обект
export function getAccessToken() {
    const user = getUserData();
    if (user) {
        return user.accessToken;
    } else {
        return null;
    }
}
// Функция която изтрива целия user
export function clearUserData() {
    localStorage.removeItem('user');
}
// Функция която го запазва
export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}
// Функция която обработва всички формуляри за submit`ване
export function createSubmitHandler(ctx, handler) {
    return function (event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        handler(ctx, formData, event);
    };
}

// export function parseQuerystring(query = '') {
//     return Object.fromEntries(query
//         .split('&')
//         .map(kvp => kvp.split('=')));
// }