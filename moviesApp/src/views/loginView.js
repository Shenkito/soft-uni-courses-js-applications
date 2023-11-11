import { html } from "../../node_modules/lit-html/lit-html.js";

import * as authService from "../services/authService.js";

const loginTemplate = (loginHandler) => html`

<div class="login-page">
    <form @submit=${loginHandler}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" name="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
`;

export const loginView = (ctx) => {
    // console.log(ctx); // виждаме какво е context (meta информация за текущата страница на която се намираме , която информация ни идва автоматично от page.js)
    const loginHandler = (e) => {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));
        authService.login(email, password)
            .then(user => {
                ctx.page.redirect('/');
                console.log('User is logged in');
            });

        // console.log(email, password);
    }

    ctx.render(loginTemplate(loginHandler));
}