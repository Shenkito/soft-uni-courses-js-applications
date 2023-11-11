import { html } from '../../node_modules/lit-html/lit-html.js';
import * as factsServices from '../api/facts.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (fact, onSubmit) => html`

<section id="edit">
    <div class="form">
        <h2>Edit Fact</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="category" id="category" .value=${fact.category} placeholder="Category" />
            <input type="text" name="image-url" id="image-url" .value=${fact.imageUrl} placeholder="Image URL" />
            <textarea id="description" .value=${fact.description} name="description" placeholder="Description" rows="10" cols="50"></textarea>
            <textarea id="additional-info" .value=${fact.moreInfo} name="additional-info" placeholder="Additional Info" rows="10"
                cols="50"></textarea>
            <button type="submit">Post</button>
        </form>
    </div>
</section>

`;

export async function editPage(ctx) {
    const factId = ctx.params.id;
    const fact = await factsServices.getById(factId);
    ctx.render(editTemplate(fact, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const factId = ctx.params.id;

    if (Object.values(data).some(x => x == '')) {
        return alert('All fields are required!')
    }

    await factsServices.update(factId, {
        category: data.category,
        imageUrl: data['image-url'],
        description: data.description,
        moreInfo: data['additional-info']
    });

    event.target.reset();

    ctx.page.redirect('/details/' + factId);
}