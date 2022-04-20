const MongoContainer = require('../../contenedor/mongoContainer');
const Cart = require('../../models/cart');

class MongoCartDao {
    productManager = new MongoContainer(Cart);
    
    add = async(productId,cartId)=>{
        if(productId){
            const cart = {
                "timestamp":Date.now(),
                "products":[],
            };
            cart.products.push(productId);
            return await this.productManager.add(productId,cartId);
        }else{
            const cart = {
                "timestamp":Date.now(),
                "products":[],
            };
            return await this.productManager.add(cart);
        }

    }
    get=async()=>{
        return await this.productManager.getAll();
    }
    delete = async(id)=>{
        return await this.productManager.delete(id);
    }
    getById = async(id)=>{
        return await this.productManager.getById(id);
    }
    Update = async (products,cartId) =>{
        return await this.productManager.Update(products,cartId);
    }
}
module.exports=MongoCartDao;