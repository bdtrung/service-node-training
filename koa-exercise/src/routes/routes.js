const Router = require('koa-router');
const productHandler = require('../handlers/products/productHandler');
const productInputMiddleware = require('../middleware/productInputMiddleware');

const router = new Router({
    prefix: '/api'
});

router.get('/product', bookHandler.getProducts);
router.get('/product/:id', bookHandler.getProduct);
router.put('/product/:id', productInputMiddleware, bookHandler.save);
router.delete('/product/:id', bookHandler.getProduct);
router.post('/products', productInputMiddleware, productHandler.save);

module.exports = router;