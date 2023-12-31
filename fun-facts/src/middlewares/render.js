import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = (user) => html`

<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
    <div>
        <a href="/dashboard">Fun Facts</a>
    </div>
    ${user
    ? html`
    <div class="user">
        <a href="/dashboard">Fun Facts</a>
        <a href="/add">Add Fact</a>
        <a href="/logout">Logout</a>
    </div>`
    : html`
    <div class="guest">
        <a href="/dashboard">Fun Facts</a>
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