const fsContainer = require ('../../contenedor/fsContainer');
const path = require('path');
const cartsPath = path.join('files','carts.json');

class FsCartDao {
    productManager = new fsContainer(cartsPath);
    
    add = async(productId,cartId)=>{
        if(productId){
            return await this.productManager.addCart(null,cartId,productId);
        }else{
            const cart = {
                "timestamp":Date.now(),
                "products":[],
            };
            return await this.productManager.addCart(cart);
        }

    }
    Update = async (products,cardId)=>{
        if(!products || !cardId){
            return{status:"error",message:"Do not exist any update info"}
        }else{
            return await this.productManager.UpdateCard(products,cardId);
        }
    }
    get = async ()=>{
        return await this.productManager.getAllCards();
    }
    getById = async (id)=>{
        return await this.productManager.getCard(id);
    }
    delete = async (id)=>{
        return await this.productManager.deleteCard(id);
    }
}
module.exports = FsCartDao;