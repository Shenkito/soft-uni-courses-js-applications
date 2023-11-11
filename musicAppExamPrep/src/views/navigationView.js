import { html } from '../../node_modules/lit-html/lit-html.js';

// Тук какво да се вижда ако не сме регистрирани на навигацията
const guestLinks = html`
<!--Only guest-->
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
`;
// Тук какво да се вижда на навигацията ако сме регистрирани
const userLinks = html`
<!--Only user-->
    <li><a href="/create">Create Album</a></li>
    <li><a href="/logout">Logout</a></li>
`;

// user служи да разберем за горните две
const navigationTemplate = (user) => html`
     <nav>
        <img src="/images/headphones.png">
        <a href="/">Home</a>
        <ul>
                    <!--All user-->
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/search">Search</a></li>
            ${user
                ? userLinks
                : guestLinks
            }

        </ul>
    </nav>
`;

export const navigationView = (ctx) => { // а тази фунцкия ще извка navigationTemplate което ще върне като резултат самият темплейт който е отгоре.

    return navigationTemplate(ctx.user);
}