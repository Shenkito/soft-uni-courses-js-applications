import * as api from './api.js';

// Адресите на който се извършват заявките
const endpoints = {
    motors: '/data/motorcycles?sortBy=_createdOn%20desc',
    create: '/data/motorcycles',
    byId: '/data/motorcycles/',
    deleteById: '/data/motorcycles/',
    update: '/data/motorcycles/',
};

// Функция която взима всички facts
export async function getAll() {
    return api.get(endpoints.motors);
}

//Функция която взима само един факт
export async function getById(id) {
    return api.get(endpoints.byId + id);
}

// Функция която създава fact
export async function create(data) {
    return api.post(endpoints.create, data);
}

// Функция която едитва fact
export async function update(id, data) {
    return api.put(endpoints.update + id, data);
}

//Функция за триене на fact
export async function deleteById(id) {
    api.del(endpoints.deleteById + id);
}