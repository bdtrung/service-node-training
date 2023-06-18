const Router = require('koa-router');
const bookHandler = require('../handlers/books/bookHandlers');
const bookInputMiddleware = require('../middleware/bookInputMiddleware');

const router = new Router({
    prefix: '/api'
});

router.get('/books', bookHandler.getBooks);
router.get('/book/:id', bookHandler.getBook);
router.post('/books', bookInputMiddleware, bookHandler.save);

module.exports = router;