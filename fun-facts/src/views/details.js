import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as factsServices from '../api/facts.js';
// import { commentFromView } from './commentForm.js';
// import { commentsView } from './comments.js';

const detailsTemplate = (fact, onDelete) => html`

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

            <!--Edit and Delete are only for creator-->
            ${fact.isOwner
            ? html`
            <div id="action-buttons">
                <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>

                <!--Bonus - Only for logged-in users ( not authors )-->
                <a href="" id="like-btn">Like</a>

            </div>`
            : nothing}

        </div>
    </div>
</section>

`;

export async function detailsPage(ctx) {
    const factId = ctx.params.id;

    const [fact] = await Promise.all([
        factsServices.getById(factId)
    ]);


    if (ctx.user) {
        fact.isOwner = ctx.user._id == fact._ownerId;
    }

    ctx.render(detailsTemplate(fact, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this game?');
        if (choice) {
            await factsServices.deleteById(factId);
            ctx.page.redirect('/dashboard');
        }
    }
}