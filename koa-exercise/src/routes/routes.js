const Router = require('koa-router');
const productHandler = require('../handlers/products/productHandlers');
const {productInputMiddleware, productInputUpdateMiddleware} = require('../middleware/productInputMiddleware.js');

const router = new Router({
    prefix: '/api'
});

router.get('/products', productHandler.getProducts);
router.get('/product/:id', productHandler.getProduct);
router.put('/product/:id', productInputUpdateMiddleware, productHandler.updateProduct);
router.delete('/product/:id', productHandler.deleteProduct);
router.post('/products', productInputMiddleware, productHandler.save);

module.exports = router;