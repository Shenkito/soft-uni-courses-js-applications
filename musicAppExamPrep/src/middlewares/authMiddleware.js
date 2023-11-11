
// Закачаме User информацията за контекста , като го взима от authService

import * as authService from '../services/authService.js';

export const authMiddleware = (ctx, next) => { // ако има user той е логнат , ако няма user няма да е логнат никой
    ctx.user = authService.getUser();

    next();
};