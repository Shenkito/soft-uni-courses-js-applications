import { clearUserData, getAccessToken } from '../util.js';

const host = 'http://localhost:3030';

// Тази функция приема 3 параметъра на тяхната база сглобява заявка която изпраща , автоматично обработва отговора (ако има грешки реагира по даден начин и ги изкарва на екрана) и накрая връща резултат ако всичко е било наред.
async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };
    
    // Проверка дали текущия потребител е логнат , ако той е логнат ще имa access token в local storage
    // Тоест тази функция ще ни върне токена , а ако няма такъв ще върне null
    const token = getAccessToken();
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    //Проверка дали има подадени данни. Ако има такива сървъра очаква да му кажем какъв е типа на данните
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // Викаме fetch със host и url който ни е подаден горе като параметър и options който току що сме изградили
    try {
        const response = await fetch (host + url, options);

        // Ако response не е ОК значи има някаква грешка. clearUserData() чисти Local Storage
        if (response.ok != true) {
            if (response.status == 403) {
                clearUserData();
            }
            // Грешката която връща сървъра я преобразуваме и я хвърляме за да може да влезе долу където обработваме грешките (т.е в catch`а)
            const error = await response.json()
            throw new Error(error.message);
        }
        // Ако всичко е минало както трябва response e ОК. Проверяваме дали имаме съдържание.
        if (response.status == 204) {
            // Връщаме response
            return response;
        } else {
            // Връщаме body`то парснато като json
            return response.json();
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

// Горе споменатата функция request я опаковаме в 4 други функций които я bind'ват за съответния метод
export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');