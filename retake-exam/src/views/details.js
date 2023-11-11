import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as motorsServices from '../api/motors.js';

const detailsTemplate = (motor, onDelete) => html`

<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${motor.imageUrl} alt="example1" />
        <p id="details-title">${motor.model}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p class="year">${motor.year}</p>
                <p class="mileage">${motor.mileage}</p>
                <p class="contact">${motor.contact}</p>
                <p id="motorcycle-description">
                    ${motor.about}
                </p>
            </div>

            ${motor.isOwner
            ? html`
            <div id="action-buttons">
                <a href="/edit/${motor._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>`
            : nothing}
        </div>
    </div>
</section>

`;

export async function detailsPage(ctx) {
    const motorId = ctx.params.id;

    const [motor] = await Promise.all([
        motorsServices.getById(motorId)
    ]);


    if (ctx.user) {
        motor.isOwner = ctx.user._id == motor._ownerId;
    }

    ctx.render(detailsTemplate(motor, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this game?');
        if (choice) {
            await motorsServices.deleteById(motorId);
            ctx.page.redirect('/dashboard');
        }
    }
}