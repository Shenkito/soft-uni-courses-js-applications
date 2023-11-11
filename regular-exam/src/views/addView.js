import { html } from '../../node_modules/lit-html/lit-html.js';

import * as factService from '../services/factService.js'

import { factIsInvalid } from '../utils/validators.js';


const addTemplate = (submitHandler) => html`
<section id="create">
    <div class="form">
        <h2>Add Fact</h2>
        <form @submit=${submitHandler}>
            <input type="text" name="category" id="category" placeholder="Category" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <textarea id="description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
            <textarea id="moreInfo" name="moreInfo" placeholder="Additional Info" rows="10"
                cols="50"></textarea>
            <button type="submit">Add Fact</button>
        </form>
    </div>
</section>
`;

export const addView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        const factData = Object.fromEntries(new FormData(e.currentTarget));

        if (factIsInvalid(factData)) {
            alert('All fields should be filled')
            return
        }

        factService.create(factData)
            .then(() => {
                ctx.page.redirect('/dashboard')
            })
            .catch(err => {
                alert(err)
            })
    }

    ctx.render(addTemplate(submitHandler))
}