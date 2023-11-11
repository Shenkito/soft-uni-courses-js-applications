import { html } from '../../node_modules/lit-html/lit-html.js';

import * as factsServices from '../api/facts.js';

const dashboardTemplate = (facts) => html`

<section id="catalog-page">
    <h2>Fun Facts</h2>

    ${facts.length > 0
    ? facts.map(factTemplate)
    : html`<h2>No Fun Facts yet.</h2>`
    }

</section>

`;

const factTemplate = (fact) => html`
<div class="fact">
    <img src=${fact.imageUrl} alt="example1" />
    <h3 class="category">${fact.category}</h3>
    <p class="description">${fact.description}</p>
    <a class="details-btn" href="/details/${fact._id}">More Info</a>
</div>`;


export async function dashboardPage(ctx) {
    const facts = await factsServices.getAll();
    ctx.render(dashboardTemplate(facts));
}