import * as authService from '../services/authService.js';

export const authMiddleware = (ctx, next) => { // закачаме за ctx(контекста) пропърти isAuthenticated - което е true/false пропърти и казва дали сме логнати или не сме.

    let user = authService.getUser();
    ctx.user = user
    ctx.isAuthenticated = Boolean(user.username);

    next(); // next върви по веригата , (see app.js) т.е след него е renderMiddleware
};