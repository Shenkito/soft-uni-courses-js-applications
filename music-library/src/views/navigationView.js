import { html } from '../../node_modules/lit-html/lit-html.js';

const guestLinks = html`
    <a href="/login">Login</a>
    <a href="/register">Register</a>
`;

const userLinks = html`
    <a href="/add">Add Album</a>
    <a href="/logout">Logout</a>
`;

const navigationTemplate = (user) => html`
    <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

    <nav>
        <div>
          <a href="/dashboard">Dashboard</a>
        ${user
            ? userLinks
            : guestLinks
        }
        </div>
    </nav>

`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
}