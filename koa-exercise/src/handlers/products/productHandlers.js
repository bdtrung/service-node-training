const {getAll: getAllProducts, getOne: getOneProduct, add: addProduct, remove: removeProduct} = require('../../database/productRepository');

async function getProducts (ctx) {
    try {
        let products = getAllProducts();
        const limit = ctx.query.limit;
        const sort = ctx.query.sort;

        if (limit) {
            products = products.slice(0, limit)
        }

        if (sort === 'asc') {
            products.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
        }

        if (sort === 'desc') {
            products.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        }

        ctx.body = {
            data: products
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

async function getProduct (ctx) {
    try {
        const {id} = ctx.params;
        const getCurrentProduct = getOneProduct(id);

        if (getCurrentProduct) {
            return ctx.body = {
                data: getCurrentProduct
            }
        }

        ctx.status = 404;
        return ctx.body = {
            status: 'error',
            message: 'product not found'
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function save(ctx) {
    try {
        const postData = ctx.request.body;
        postData.createdAt = new Date();
        addProduct(postData);

        ctx.status = 201;
        return ctx.body = {
            success: true
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function deleteProduct(ctx) {
    try {
        const {id} = ctx.params;
        const productDelete = removeProduct(id);
        console.log(productDelete)
        if (productDelete) {
            return ctx.body = {
                success: true,
                message: 'product removed'
            }
        }

        ctx.status = 404;
        return ctx.body = {
            status: 'error',
            message: 'product not found'
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}


module.exports = {
    getProducts,
    getProduct,
    save,
    deleteProduct
}