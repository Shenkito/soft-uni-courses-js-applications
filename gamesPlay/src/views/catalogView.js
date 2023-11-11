import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as fruitService from '../services/fruitService.js';

import { fruitTemplate } from './templates/fruitsTemplate.js';


const catalogTemplate = (fruits) => html`
    <section>
        <h2>Fruits</h2>
        ${fruits.map(x => fruitTemplate(x))}

        ${fruits.length == 0
        ? html`<p>No fruit info yet.</p>`
        : nothing
    }

    </section>

`;

export const catalogView = (ctx) => {
    fruitService.getAll()
        .then(fruits => {
            console.log('YES');
            ctx.render(catalogTemplate(fruits))
        });
}