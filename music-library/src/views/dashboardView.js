import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as albumService from '../services/albumService.js';

import { albumTemplate } from './templates/albumsTemplate.js';


const dashboardTemplate = (albums) => html`

    <section id="dashboard">
        <h2>Albums</h2>
        ${albums.map(x => albumTemplate(x))}

        ${albums.length == 0
            ? html`<h2>There are no albums added yet.</h2>`
            : nothing
        }
    </section>

`;

export const dashboardView = (ctx) => {
    albumService.getAll()
        .then(albums => {
            console.log('YES');
            ctx.render(dashboardTemplate(albums))
        });
}