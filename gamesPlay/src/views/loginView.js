import { html } from '../../node_modules/lit-html/lit-html.js';

import * as userService from '../services/userService.js';

const loginTemplate = (submitHandler) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${submitHandler}>
            <input type="text" class="email" name="email" id="email" placeholder="email" />
            <input type="password" class="email" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>
`;

export const loginView = (ctx) => {
    
    const submitHandler = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        if (email == '' || password == '') {
            alert('Invalid fields');
            return;
        }
        
        userService.login(email, password)
            .then(() => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err)
            });
    }

    ctx.render(loginTemplate(submitHandler));
};