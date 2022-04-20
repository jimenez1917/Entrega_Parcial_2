// fs

const fs = require('fs');

// connección a la base de datos
class fsContainer {
    constructor(file) {
        this.file = file;
    }
    add=async(product)=>{
        if(fs.existsSync(this.file)){
            try{
                if(product.nombre && product.descripcion && product.codigo && product.foto_url && product.precio && product.stock ){
                     const data= await fs.promises.readFile(this.file, 'utf-8', null, 2);
                     const products=JSON.parse(data);
                     if(products.length===0){
                         product.id=1;
                         products.push(product);
                         fs.promises.writeFile(this.file,JSON.stringify(products,null,2))   
                         return {status:"succes", payload:'Added first product'}                    
                     }
                     product.id= products[products.length-1].id+1;
                     products.push(product);
                     await fs.promises.writeFile(this.file,JSON.stringify(products,null,2));
                     return {status:"success",payload:`added product`}
                     }else{
                         return {status:"error", payload:"Envia el siguiente body={nombre,descripción,codigo,foto(url),precio,stock o tienes un campo vación"}
                     }
             }catch(error){
                 return {status:"error", error:'mensaje'}
             }
        }else{
            try{
                 if(product.nombre && product.descripcion && product.codigo && product.foto_url && product.precio && product.stock){
                     product.id=1;
                     await fs.promises.writeFile(this.file,JSON.stringify([product],null,2))
                     return {status:"succes", payload:"Added first product"}
                 }else{
                     return {status:"error", payload:"Envia el siguiente body={nombre,descripción,codigo,foto(url),precio,stock o tienes campos vacios"}                   
                 }
             }catch(error){
                 return {status:"error", message:error}
             }
        }
    }
    getAll = async () => {
        try {
            const getProducts = await fs.promises.readFile(this.file, 'utf-8', null, 2);
            const products = JSON.parse(getProducts);
            return {
                status: 'success',
                payload: products
            }
        } catch (error) {
            return {status:"error", message:error}
        }
    }
    delete = async (id)=>{
        if(fs.existsSync(this.file)){
            try{
                let data = await fs.promises.readFile(this.file,'utf-8')
                let products = JSON.parse(data);
                let secure =  products.some(product=>product.id===parseInt(id));
                if(secure){
                     let newproducts= products.filter(product => product.id!==parseInt(id))
                     await fs.promises.writeFile(this.file,JSON.stringify(newproducts,null,2))
                     return {status:"success", payload:'Deleted Product'};
                }else{
                    return {status:"error", message:"The product never exist"}
                }

            }catch(err) {
                return {status:"error", message: error.message}
            }
        }else{
            return {status:"failes", message: 'try again later'}
        }
    }
    getById = async(id)=>{
        if(!id) return {status:"failes", message:"Needed an Id"}
        if(fs.existsSync(this.file)){
            try{
                let data = await fs.promises.readFile(this.file,'utf-8')
                let products = JSON.parse(data);
                let secure =products.some(product =>product.id === parseInt(id))
                let product = products.filter(product =>product.id === parseInt(id))
                if(secure){
                    return {status:'success', products:product}
                }else{
                    return false;
                }
            }catch(error) {
                return{status:'denied', message: error}
            }
        }
    }
    UploadById = async (id,body) => {
        if(!id) return {status:'denied', message:'Needed an Id'}
        if(body.nombre && body.descripcion && body.codigo && body.foto_url && body.precio && body.stock){
            if(fs.existsSync(this.file)){
                 try{
                     let data = await fs.promises.readFile(this.file,'utf-8')
                     let products = JSON.parse(data);
                     let secure =  products.some(product=>product.id===parseInt(id));
                     if (secure){                    
                         let newproducts= products.map(product => {
                             if(product.id=== parseInt(id)){
                                
                                 body.id=parseInt(id);
                                 return body;
                             }else{
                                 return product;
                             }
                         })
                         await fs.promises.writeFile(this.file,JSON.stringify(newproducts,null,2))
                         return {status:'success', message: 'Product Update'}
                 }else{
                     return {status:'error', message:"Don't exist this product"}
                 }
 
                 }catch(error){
                     return {status:'error', message: error.message}
                 }
            }
        }else{
             return {status:"error", payload:"Envia el siguiente body={nombre,descripción,codigo,foto(url),precio,stock o tienes campos vacios"}
        }
    }
    addCart = async(card,cardId,productArray) => {  
        if(fs.existsSync(this.file)){
            try{
                if(cardId){
                    const data= await fs.promises.readFile(this.file, 'utf-8', null, 2);
                    const products=JSON.parse(data);
                    const findCard = products.find(product=>product.id === parseInt(cardId))
                    
                    if(findCard){
                        productArray.map(product=>findCard.products.push(product))
                        let newcard= products.map(product => {
                            if(product.id===parseInt(cardId)){
                                return findCard
                            }else{
                                return product
                            }
                        })
                        fs.promises.writeFile(this.file,JSON.stringify(newcard,null,2))   
                        return {status:"succes", payload:'Products added'}  
                    }
                }
                if(card!=null){
                    const data= await fs.promises.readFile(this.file, 'utf-8', null, 2);
                    const products=JSON.parse(data);
                     if(products.length===0){
                         card.id=1;
                         products.push(card);
                         fs.promises.writeFile(this.file,JSON.stringify(products,null,2))   
                         return {status:"succes", payload:'Added first cart'}                    
                     }
                     card.id= products[products.length-1].id+1;
                     products.push(card);
                     await fs.promises.writeFile(this.file,JSON.stringify(products,null,2));
                     return {status:"success",payload:`added cart`}
                     }else{
                         return {status:"error", payload:"Error, try later or try again"}
                     }
             }catch(error){
                 return {status:"error", error:error.massage}
             }
        }else{
            return {status:"error", payload:"the file does not exist"}
        }
    }
    UpdateCard = async (productArray,cardId) => {
        if(fs.existsSync(this.file)){
            try{
                if(cardId){
                    const data= await fs.promises.readFile(this.file, 'utf-8', null, 2);
                    const products=JSON.parse(data);
                    const findCard = products.find(product=>product.id === parseInt(cardId))
                    if(findCard){
                        findCard.products = [];
                        productArray.productId.map(product=>{findCard.products.push(product)})
                        let newcard= products.map(product => {
                            if(product.id===parseInt(cardId)){
                                return findCard
                            }else{
                                return product
                            }
                        })
                        fs.promises.writeFile(this.file,JSON.stringify(newcard,null,2))   
                        return {status:"succes", payload:'Products updated'}  
                    }else{
                        return {status:"error", message:"Does not exist the cardId"}
                    }
                }
            }catch(error){return {status:"error",message:error.message}}
        }else{return {status:"error",message:error.message}}
    }
    getAllCards = async ()=>{
        if(fs.existsSync(this.file)){
            try{
                    const data= await fs.promises.readFile(this.file, 'utf-8', null, 2);
                    const products=JSON.parse(data);
                    return {status:"succes", payload:products}  
            }catch(error){return {status:"error",message:error.message}}
        }else{return {status:"error",message:"file does not exist"}}
    }
    getCard = async(id)=>{
        if(fs.existsSync(this.file)){
            try{
                    const data= await fs.promises.readFile(this.file, 'utf-8', null, 2);
                    const products=JSON.parse(data);
                    const card = products.find(product => product.id===parseInt(id))
                    return {status:"succes", payload:card}  
            }catch(error){return {status:"error",message:error.message}}
        }else{return {status:"error",message:"file does not exist"}}
    }
    deleteCard= async (id)=>{
        if(fs.existsSync(this.file)){
            try{
                    const data= await fs.promises.readFile(this.file, 'utf-8', null, 2);
                    const products=JSON.parse(data);
                    const secure = products.some(product=>product.id=== parseInt(id))
                    if(secure){
                        let card= products.map(product => {
                            if(product.id!==parseInt(id)){
                                return product
                            }
                        })
                        fs.promises.writeFile(this.file,JSON.stringify(card,null,2)) 
                        return {status:"succes", payload:card}
                    }else{return{status:"error",message:error.message}}
            }catch(error){return {status:"error",message:error.message}}
        }else{return {status:"error",message:"file does not exist"}}
    }
}

module.exports = fsContainer;