import { html } from '../../node_modules/lit-html/lit-html.js';

import * as motorsServices from '../api/motors.js';

const dashboardTemplate = (motors) => html`

<section id="dashboard">
    <h2>Available Motorcycles</h2>

    ${motors.length > 0
    ? motors.map(motorTemplate)
    : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`
    }

</section>

`;

export const motorTemplate = (motor) => html`
<div class="motorcycle">
    <img src=${motor.imageUrl} alt="example1" />
    <h3 class="model">${motor.model}</h3>
    <p class="year">${motor.year}</p>
    <p class="mileage">${motor.mileage}</p>
    <p class="contact">${motor.contact}</p>
    <a class="details-btn" href="/details/${motor._id}">More Info</a>
</div>`;


export async function dashboardPage(ctx) {
    const motors = await motorsServices.getAll();
    ctx.render(dashboardTemplate(motors));
}