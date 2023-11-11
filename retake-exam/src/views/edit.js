import { html } from '../../node_modules/lit-html/lit-html.js';
import * as motorsServices from '../api/motors.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (motor, onSubmit) => html`

<section id="edit">
    <h2>Edit Motorcycle</h2>
    <div class="form">
        <h2>Edit Motorcycle</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="model" id="model" .value=${motor.model} placeholder="Model" />
            <input type="text" name="imageUrl" id="moto-image" .value=${motor.imageUrl} placeholder="Moto Image" />
            <input type="number" name="year" id="year" .value=${motor.year} placeholder="Year" />
            <input type="number" name="mileage" id="mileage" .value=${motor.mileage} placeholder="mileage" />
            <input type="number" name="contact" id="contact" .value=${motor.contact} placeholder="contact" />
            <textarea id="about" .value=${motor.about} name="about" placeholder="about" rows="10" cols="50"></textarea>
            <button type="submit">Edit Motorcycle</button>
        </form>
    </div>
</section>

`;

export async function editPage(ctx) {
    const motorId = ctx.params.id;
    const motor = await motorsServices.getById(motorId);
    ctx.render(editTemplate(motor, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const motorId = ctx.params.id;

    if (Object.values(data).some(x => x == '')) {
        return alert('All fields are required!')
    }

    await motorsServices.update(motorId, {
        model: data.model,
        imageUrl: data.imageUrl,
        year: data.year,
        mileage: data.mileage,
        contact: data.contact,
        about: data.about
    });

    event.target.reset();

    ctx.page.redirect('/details/' + motorId);
}