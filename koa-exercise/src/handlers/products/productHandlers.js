const {getAll: getAllProducts, getOne: getOneProduct, add: addProduct, remove: removeProduct, saveProduct: saveProduct} = require('../../database/productRepository');

async function getProducts (ctx) {
    try {
        let products = getAllProducts();
        const limit = ctx.query.limit;
        const sort = ctx.query.sort;

        if (sort === 'asc') {
            products.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
        }

        if (sort === 'desc') {
            products.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        }
        if (limit) {
            products = products.slice(0, limit)
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
        const fields = ctx.query.fields;
        const currentProduct = getOneProduct(id);

        if (fields) {
            const arrFields = fields.split(',');
            const newObjProduct = Object.fromEntries(arrFields.map((field) => [field, currentProduct[field]]));

            return ctx.body = {
                data: newObjProduct
            }
        }

        if (currentProduct) {
            return ctx.body = {
                data: currentProduct
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

async function updateProduct(ctx) {
    try {
        const {id} = ctx.params;
        const postData = ctx.request.body;
        saveProduct(id, postData);

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
    deleteProduct,
    updateProduct
}