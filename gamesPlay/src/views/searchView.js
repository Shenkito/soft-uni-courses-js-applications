import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as fruitService from '../services/fruitService.js';

import { fruitTemplate } from './templates/fruitsTemplate.js';

const searchTemplate = (searchHandler, fruits) => html`
<section id="search">

    <div class="form">
        <h2>Search</h2>
        <form class="search-form">
            <input type="text" name="search" id="search-input" />
            <button class="button-list" @click=${searchHandler}>Search</button>
        </form>
    </div>
    <h4>Results:</h4>
    ${fruits.length > 0
        ? fruits.map(x => fruitTemplate(x))
        : html`<p class="no-result">No result.</p>`
    }
</section>
`;

export const searchView = (ctx) => {
    const searchHandler = (e) => {
        e.preventDefault();
        let searchedElement = document.getElementById('search-input');

        fruitService.search(searchedElement.value)
            .then(fruits => {
                ctx.render(searchTemplate(searchHandler, fruits));
            })
    }

    ctx.render(searchTemplate(searchHandler, []));
}