import { html, nothing } from '../../../node_modules/lit-html/lit-html.js';

const factDetails = (factId) => html`
<div>
    <a class="details-btn" href="/facts/${factId}">More Info</a>
</div>
`;

export const factTemplate = (fact, withDetails = true) => html`

<section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    <div class="fact">
        <img src="${fact.imageUrl}" alt="example1" />
        <h3 class="category">${fact.category}</h3>
        <p class="description">${fact.description}</p>
        ${withDetails
            ? factDetails(fact._id)
            : nothing
        }
        `;