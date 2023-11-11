import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const loginTemplate = (onSubmit) => html`

<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>

`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const pass = data.password;
    const email = data.email;

    if (pass == '' || email == '') {
    return window.alert('All fields must be filled!')
    }

    await userService.login(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/');
}