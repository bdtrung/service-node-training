const yup = require('yup');

async function productInputMiddleware (ctx, next) {
    try {
        const postData = ctx.request.body;

        let schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string().required(),
            price: yup.number().round().required(),
            description: yup.string().required(),
            product: yup.string().required(),
            color: yup.string().required(),
            createdAt: yup.date(),
            image: yup.string().url().required(),
        });

        await schema.validate(postData);
        next()
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}

async function productInputUpdateMiddleware (ctx, next) {
    try {
        const postData = ctx.request.body;

        let schema = yup.object().shape({
            name: yup.string(),
            price: yup.number().round(),
            description: yup.string(),
            product: yup.string(),
            color: yup.string(),
            image: yup.string().url()
        });

        await schema.validate(postData);
        next()
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}

module.exports = {productInputMiddleware, productInputUpdateMiddleware};