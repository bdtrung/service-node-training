const Router = require('koa-router');
const productHandler = require('../handlers/products/productHandlers');
const {productInputMiddleware, productInputUpdateMiddleware} = require('../middleware/productInputMiddleware.js');
const {getAll: getAllProducts} = require('../database/productRepository');

const router = new Router();

router.get('/products', async (ctx) => {
    const products = getAllProducts();
    await ctx.render('pages/products', { products })
})

router.get('/api/products', productHandler.getProducts);
router.get('/api/product/:id', productHandler.getProduct);
router.put('/api/product/:id', productInputUpdateMiddleware, productHandler.updateProduct);
router.delete('/api/product/:id', productHandler.deleteProduct);
router.post('/api/products', productInputMiddleware, productHandler.save);

module.exports = router;