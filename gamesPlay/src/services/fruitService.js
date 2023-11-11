import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data/fruits';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOne = (fruitId) => request.get(`${baseUrl}/${fruitId}`);

export const create = (fruitData) => request.post(baseUrl, fruitData);

export const edit = (fruitId, fruitData) => request.put(`${baseUrl}/${fruitId}`, fruitData);

export const remove = (fruitId) => request.del(`${baseUrl}/${fruitId}`);

export const search = (searchText) => {

    const query = encodeURIComponent(`name LIKE "${searchText}"`)
    
    return request.get(`${baseUrl}?where=${query}`)
}