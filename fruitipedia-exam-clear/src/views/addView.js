import { html } from '../../node_modules/lit-html/lit-html.js';

import * as fruitService from '../services/fruitService.js';

import { fruitIsInvalid } from '../utils/validators.js';

const addTemplate = (submitHandler) => html`
<section id="create">
    <div class="form">
        <h2>Add Fruit</h2>
        <form @submit=${submitHandler}>
            <input type="text" name="name" id="name" placeholder="Fruit Name" />
            <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image" />
            <textarea id="fruit-description" name="description" placeholder="Description" rows="10"
                cols="50"></textarea>
            <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"></textarea>
            <button type="submit">Add Fruit</button>
        </form>
    </div>
</section>
`;

export const addView = (ctx) => {

    const submitHandler = (e) => {
        e.preventDefault();

        const fruitData = Object.fromEntries(new FormData(e.currentTarget));

        if (fruitIsInvalid(fruitData)) {
            alert('All fields should be filled')
            return;
        }

        fruitService.create(fruitData)
            .then(() => {
                ctx.page.redirect('/catalog')
            })
            .catch(err => {
                alert(err);
            })
    }

    ctx.render(addTemplate(submitHandler));
}