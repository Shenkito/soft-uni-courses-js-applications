import { html, nothing } from '../../../node_modules/lit-html/lit-html.js';

const fruitDetails = (fruitId) => html`
    <div>
        <a class="details-btn" href="/fruits/${fruitId}">More Info</a>
    </div>
`;

export const fruitTemplate = (fruit, withDetails = true) => html`

<section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    <div class="fruit">
        <img src="${fruit.imageUrl}" alt="example1" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        ${withDetails
            ? fruitDetails(fruit._id)
            : nothing
        }
    </div>
    `;