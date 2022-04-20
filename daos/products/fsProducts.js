const fsContainer = require('../../contenedor/fsContainer');
const path = require('path')
const productsPath = path.join('files', 'productos.json')

class FsProductDao {
    productManager = new fsContainer(productsPath);
    getAll = async () => {
        return await this.productManager.getAll();
    }
    add = async (body) => {
        return await this.productManager.add(body);
    }
    delete = async (id)=>{
        return await this.productManager.delete(id);
    }
    getById = async (id) => {
        return await this.productManager.getById(id);
    }
    UploadById = async (id,body) => {
        return await this.productManager.UploadById(id,body);
    }
}
module.exports = FsProductDao;