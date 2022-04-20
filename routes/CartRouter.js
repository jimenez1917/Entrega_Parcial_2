const express= require('express');
const router=express.Router();
const {cartDao}=require('../daos');
const admin= require('../Admin/admin')
const AdminService = new admin();


let idAdmin=1;
/// Poner idAdmin en 1 para true; en 0 para false;
const Admin = (req, res, next) => {
    AdminService.admin(idAdmin).then(result=>{
        if(result){
            next();
        }else{
            res.status(404).send({error:"Poder",description: "ruta no autrizada", message: 'No estas logeado admin'})
        }
    })
}
router.post('/:id',Admin,async (req,res) =>{
    const productId = req.body.productId;
    const cart= await cartDao.add(productId,req.params.id);
    res.json({
        cart,
        message:'cart post success',
    })
});
router.get('/',Admin,async(req,res) =>{
    const cart = await cartDao.get();
    res.json({
        cart,
        message:'success',
    })
})
router.get('/:id', Admin, async(req,res) =>{
    const cart = await cartDao.getById(req.params.id);
    res.json({
        cart,
        message:'success',
    })
})
router.delete('/:id',Admin,async(req, res)=>{
       const cart = await cartDao.delete(req.params.id);
       res.json({
           cart,
           message:'deleted cart',
       })
})
router.post('/',Admin,async(req, res)=>{
    const cart= await cartDao.add();
    res.json({
        cart,
        message:'cart post success',
    })
})
router.put('/:id/productos',Admin,async(req,res)=>{
    let body = req.body;
    const cart = await cartDao.Update(body,req.params.id);
    res.json({
        cart,
        message: 'products updated'
    })
})

module.exports=router;