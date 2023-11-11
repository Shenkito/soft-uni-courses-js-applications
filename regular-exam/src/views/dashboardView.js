import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as factService from '../services/factService.js';

import { factTemplate } from './templates/factsTemplate.js';

const dashboardTemplate = (facts) => html`


        <h2>Fun Facts</h2>
        ${facts.map(x => factTemplate(x))}

        ${facts.length == 0
            ? html`<h2>No Fun Facts yet.</h2>`
            : nothing
        }

`;

export const dashboardView = (ctx) => {
    factService.getAll()
        .then(facts => {
            ctx.render(dashboardTemplate(facts))
        })
}