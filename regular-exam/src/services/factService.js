import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data/facts';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOne = (factId) => request.get(`${baseUrl}/${factId}`);

export const create = (factData) => request.post(baseUrl, factData);

export const edit = (factId, factData) => request.put(`${baseUrl}/${factId}`, factData);

export const remove = (factId) => request.del(`${baseUrl}/${factId}`);

export const search = (searchText) => {

    const query = encodeURIComponent(`name LIKE "${searchText}"`)
    
    return request.get(`${baseUrl}?where=${query}`)
}