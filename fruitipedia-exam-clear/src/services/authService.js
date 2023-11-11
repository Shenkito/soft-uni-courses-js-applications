export const saveUser = (user) => {
    if (user.accessToken) {

        localStorage.setItem('user', JSON.stringify(user));
    }
};

export const deleteUser = () => {
    localStorage.removeItem('user');
}

export const getUser = () => {
    let serializerdUser = localStorage.getItem('user');

    if (serializerdUser) { // взима user от LocalStorage
        let user = JSON.parse(serializerdUser);

        return user;
    }

    // ако го няма ще върне Undefined
}

export const getToken = () => getUser()?.accessToken;