const fs = require('fs');
const {data: products} = require('./product.json')

function getAll() {
    return products;
}

function getOne(id) {
    return products.find(product => product.id === parseInt(id));
}

function add(data) {
    const updateProducts = [data, ...books];

    return fs.writeFileSync('./src/database/product.json', JSON.stringify({
        data: updateProducts
    }))
}

function delete(id) {
    const deleteProduct = products.find(product => product.id === parseInt(id));
}

module.exports = {
    getAll,
    getOne,
    add
}