const Router = require('koa-router');
const productHandler = require('../handlers/products/productHandlers');
const productInputMiddleware = require('../middleware/productInputMiddleware');

const router = new Router({
    prefix: '/api'
});

router.get('/products', productHandler.getProducts);
router.get('/product/:id', productHandler.getProduct);
router.put('/product/:id', productInputMiddleware, productHandler.save);
router.delete('/product/:id', productHandler.deleteProduct);
router.post('/products', productHandler.save);

module.exports = router;