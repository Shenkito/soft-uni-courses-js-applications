import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as motorsServices from '../api/motors.js';

const addTemplate = (onSubmit) => html`

<section id="create">
    <h2>Add Motorcycle</h2>
    <div class="form">
        <h2>Add Motorcycle</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="model" id="model" placeholder="Model" />
            <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" />
            <input type="number" name="year" id="year" placeholder="Year" />
            <input type="number" name="mileage" id="mileage" placeholder="mileage" />
            <input type="text" name="contact" id="contact" placeholder="contact" />
            <textarea id="about" name="about" placeholder="about" rows="10" cols="50"></textarea>
            <button type="submit">Add Motorcycle</button>
        </form>
    </div>
</section>

`;

export function addPage(ctx) {
    ctx.render(addTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(x => x == '')) {
    return alert('All fields are required!')
}

await motorsServices.create({
    model: data.model,
    imageUrl: data.imageUrl,
    year: data.year,
    mileage: data.mileage,
    contact: data.contact,
    about: data.about
});

event.target.reset();

ctx.page.redirect('/dashboard');
}