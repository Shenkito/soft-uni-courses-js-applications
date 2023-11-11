import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as fruitService from '../services/fruitService.js';

import { fruitIsInvalid } from '../utils/validators.js';

const editTemplate = (fruit, submitHandler) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form">
        <h2>Edit Fruit</h2>
        <form @submit=${submitHandler} method="POST">
            <input type="text" name="name" value=${fruit.name} id="name" placeholder="Fruit Name" />
            <input type="text" name="imageUrl" value=${fruit.imageUrl} id="Fruit-image" placeholder="Fruit Image URL" />
            <textarea id="fruit-description" name="description" .value=${fruit.description} placeholder="Description" rows="10"
                cols="50"></textarea>
            <textarea id="fruit-nutrition" name="nutrition" .value=${fruit.nutrition} placeholder="Nutrition" rows="10" cols="50"></textarea>
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export const editView = (ctx) => {
    const fruitId = ctx.params.fruitId;

    const submitHandler = (e) => {
        e.preventDefault();

        const fruitData = Object.fromEntries(new FormData(e.currentTarget));

        if (fruitIsInvalid(fruitData)) {
            alert('All fields should be filled')
            return;
        }

        fruitService.edit(fruitId, fruitData)
            .then(() => {
                ctx.page.redirect(`/fruits/${fruitId}`);
            })
    }

    fruitService.getOne(ctx.params.fruitId)
        .then(fruit => {
            ctx.render(editTemplate(fruit, submitHandler));
        })
}