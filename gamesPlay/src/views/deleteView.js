import * as fruitService from '../services/fruitService.js';

export const deleteView = async (ctx) => {
    try {
        
        const fruit = await fruitService.getOne(ctx.params.fruitId)

        let confirmed = confirm(`Do you want to continue with deleting this fruit: ${fruit.name}?`);

        if (confirmed) {
            await fruitService.remove(ctx.params.fruitId);

            ctx.page.redirect('/catalog')
        }

    } catch (err) {
        alert(err)
    }
};