import * as factService from '../services/factService.js'

export const deleteView = async (ctx) => {
    try {
        
        const fact = await factService.getOne(ctx.params.factId)

        let confirmed = confirm(`Do you want to delete ${fact.category} ?`)

        if (confirmed) {
            await factService.remove(ctx.params.factId);
            ctx.page.redirect('/dashboard')
        }
    } catch (err) {
        alert(err)
    }
};