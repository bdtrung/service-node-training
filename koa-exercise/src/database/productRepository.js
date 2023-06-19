const fs = require('fs');
const {data: products} = require('./product.json')

function getAll() {
    return products;
}

function getOne(id) {
    return products.find(product => product.id === parseInt(id));
}

function add(data) {
    const updateProducts = [data, ...products];

    return fs.writeFileSync('./src/database/product.json', JSON.stringify({
        data: updateProducts
    }))
}

function remove(id) {
    let deleteProduct, updateProduct;
    deleteProduct = products.find(product => product.id === parseInt(id));

    if (deleteProduct) {
        [deleteProduct, ...updateProducts] = products;
        return fs.writeFileSync('./src/database/product.json', JSON.stringify({
            data: updateProducts
        }))
    }

    return false;
}


module.exports = {
    getAll,
    getOne,
    add,
    remove
}