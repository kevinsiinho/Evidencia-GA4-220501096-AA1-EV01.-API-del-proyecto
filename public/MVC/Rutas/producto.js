const express= require('express')
const productoSchema = require('../models/producto');

const router=express.Router();

//mostrar
router.get("/productos", (req,res)=>{
    productoSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({menssage:error}))
    
})

router.get("/producto/:id", (req, res) => {
    const Id = req.params.id; 
    productoSchema
        .findById(Id) 
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});


//Guardar
router.post("/producto", (req, res)=> {
   const nuevo= new productoSchema();
   nuevo._id=req.body._id
   nuevo.nombre=req.body.nombre
   nuevo.Categoria=req.body.categoria
   nuevo.valor=req.body.valor
       nuevo
            .save()
            .then(data => {
                res.json({ mensaje: "Guardado" });
            })
            .catch(error => {
                res.status(500).json({ mensaje: "Error al guardar el producto", error: error });
            });
            
 })
 
  
//actualizar
router.put("/producto/:id", (req, res)=> {
    const{id}=req.params;
    const{nombre,categoria,valor}=req.body;
     productoSchema
               .updateOne({_id:id},{$set:{nombre,categoria,valor}})
               .then(data => {
                res.json({ mensaje: "Actualizado" });
                })
                .catch(error => {
                    res.status(500).json({ mensaje: "Error al guardar el producto", error: error });
                });
 })

//eliminar
router.delete("/producto/:id", (req, res)=> {
    const{id}=req.params;
     productoSchema
               .remove({_id:id})
               .then(data => {
                res.json({ mensaje: "Eliminado" });
                })
                .catch(error => {
                    res.status(500).json({ mensaje: "Error al guardar el producto", error: error });
                });    
 })
 
module.exports=router;
