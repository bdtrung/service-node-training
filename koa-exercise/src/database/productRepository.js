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
    const deleteProduct = products.find(product => product.id === parseInt(id));

    if (deleteProduct) {
        const updatedProducts = products.filter(product => product.id !== parseInt(id));

        fs.writeFileSync('./src/database/product.json', JSON.stringify({
            data: updatedProducts
        }))

        return true;
    }

    return false;
}

function saveProduct(id, data) {
    const updateProducts = products.map(product => [data].find(dataUpdate => dataUpdate.id === product.id) || product);

    return fs.writeFileSync('./src/database/product.json', JSON.stringify({
        data: updateProducts
    }))
}


module.exports = {
    getAll,
    getOne,
    add,
    remove,
    saveProduct
}