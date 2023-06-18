const fs = require('fs');
const {data: books} = require('./book.json')

function getAll() {
    return books;
}

function getOne(id) {
    return books.find(book => book.id === parseInt(id));
}

function add(data) {
    const updateBooks = [data, ...books];

    return fs.writeFileSync('./src/database/book.json', JSON.stringify({
        data: updateBooks
    }))
}

module.exports = {
    getAll,
    getOne,
    add
}