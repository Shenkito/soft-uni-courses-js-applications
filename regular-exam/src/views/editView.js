import { html } from '../../node_modules/lit-html/lit-html.js';

import * as factService from '../services/factService.js';

import { factIsInvalid } from '../utils/validators.js'


const editTemplate = (fact, submitHandler) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Fact</h2>
        <form @submit=${submitHandler} method="POST">
            <input type="text" name="category" value=${fact.category} id="category" placeholder="Category" />
            <input type="text" name="imageUrl" value=${fact.imageUrl} id="imageUrl" placeholder="Image URL" />
            <textarea id="description" name="description" .value=${fact.description} placeholder="Description" rows="10" cols="50"></textarea>
            <textarea id="moreInfo" name="moreInfo" .value=${fact.moreInfo} placeholder="Additional Info" rows="10"
                cols="50"></textarea>
            <button type="submit">Post</button>
        </form>
    </div>
</section>
`;

export const editView = (ctx) => {
    const factId = ctx.params.factId;

    const submitHandler = (e) => {
        e.preventDefault();

        const factData = Object.fromEntries(new FormData(e.currentTarget));
    
        if (factIsInvalid(factData)) {
            alert('All fields should be filled')
            return;
        }
    
        factService.edit(factId, factData)
            .then(() => {
                ctx.page.redirect(`/facts/${factId}`);
            })
    }

    factService.getOne(ctx.params.factId)
        .then(fact => {
            ctx.render(editTemplate(fact, submitHandler))
        })
}