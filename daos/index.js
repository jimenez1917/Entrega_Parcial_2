const MongoProductDao = require('./products/mongoProductDao.js');
const fsProducts = require ('./products/fsProducts.js');
const MongoCartDao = require('./carts/mongoCartDao.js');
const fsCarts = require ('./carts/fsCarts.js');

const dbToUse = 'fs';

let productDao ;
let cartDao;

switch (dbToUse) {
    case 'mongo':
        cartDao = new MongoCartDao();
        productDao = new MongoProductDao();
        break;
    case 'fs':
        productDao = new fsProducts();
        cartDao = new fsCarts();
        break;
    default:
        break;
}

module.exports = {productDao,cartDao};
