import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as factService from '../services/factService.js';

const detailsTemplate = (fact, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fact.imageUrl} alt="example1" />
        <p id="details-category">${fact.category}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p id="description">
                    ${fact.description}
                </p>
                <p id="more-info">
                    ${fact.moreInfo}
                </p>
            </div>

            <h3>Likes:<span id="likes">0</span></h3>
            ${isOwner
            ? html`
            <div id="action-buttons">
                <a href="/facts/${fact._id}/edit" id="edit-btn">Edit</a>
                <a href="/facts/${fact._id}/delete" id="delete-btn">Delete</a>
                <a href="" id="like-btn">Like</a>
            </div>`
            :nothing
            }
        <!--Bonus - Only for logged-in users ( not authors )-->

            </div>
        </div>
    </div>
</section>

`;

export const detailsView = (ctx) => {
    factService.getOne(ctx.params.factId)
        .then(fact => {
            let isOwner = fact._ownerId == ctx.user._id

            ctx.render(detailsTemplate(fact, isOwner));
        })
}

