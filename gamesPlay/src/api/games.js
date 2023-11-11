import * as api from './api.js';

// Адресите на който се извършват заявките
const endpoints = {
    recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    games: '/data/games?sortBy=_createdOn%20desc',
    create: '/data/games',
    byId: '/data/games/',
    deleteById: '/data/games/',
    update: '/data/games/',
};

// Функция която взима recent games
export async function getRecent() {
    return api.get(endpoints.recent);
}

// Функция която взима всички games
export async function getAll() {
    return api.get(endpoints.games);
}

//Функция която взима само една игра
export async function getById(id) {
    return api.get(endpoints.byId + id);
}

// Функция която създава game
export async function create(data) {
    return api.post(endpoints.create, data);
}

// Функция която едитва играта
export async function update(id, data) {
    return api.put(endpoints.update + id, data);
}

//Функция за триене на игра
export async function deleteById(id) {
    api.del(endpoints.deleteById + id);
}
