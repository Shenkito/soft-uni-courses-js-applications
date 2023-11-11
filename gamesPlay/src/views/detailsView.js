import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as fruitService from '../services/fruitService.js';

const detailsTemplate = (fruit, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fruit.imageUrl} alt="example1" />
        <p id="details-title">${fruit.name}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p>
                    ${fruit.description}
                </p>
                <p id="nutrition">Nutrition</p>
                <p id="details-nutrition">
                    ${fruit.nutrition}
                </p>
            </div>
            <!--Edit and Delete are only for creator-->
            ${isOwner
            ? html`
            <div id="action-buttons">
                <a href="/fruits/${fruit._id}/edit" id="edit-btn">Edit</a>
                <a href="/fruits/${fruit._id}/delete" id="delete-btn">Delete</a>
            </div>`
            : nothing
            }
        </div>
    </div>
</section>
`;

export const detailsView = (ctx) => {
    fruitService.getOne(ctx.params.fruitId)
        .then(fruit => {
            let isOwner = fruit._ownerId == ctx.user._id

            ctx.render(detailsTemplate(fruit, isOwner));
        });
}