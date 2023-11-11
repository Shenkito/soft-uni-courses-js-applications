import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = (user) => html`

<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/catalog">All games</a>
    ${user
    ? html`
    <div id="user">
        <a href="/create">Create Game</a>
        <a href="/logout">Logout</a>
    </div>`
    : html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    `}

</nav>
`;

const header = document.querySelector('.my-header');
const root = document.getElementById('main-content');

function ctxRender(content) {
    render(content, root);
}

// Функция която добавя render към context
export function addRender(ctx, next) {
    console.log(ctx.user);
    render(navTemplate(ctx.user), header);
    // Приема template който view е създал и ще го покаже на екрана (т.е в root елемента)
    ctx.render = ctxRender;
    next();
}