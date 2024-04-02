const express= require('express')
const usuarioSchema = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router=express.Router();

// Autenticación de usuario
router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await usuarioSchema.findOne({ correo: correo });

        if (!usuario) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json({ mensaje: "Credenciales inválidas, intentanuevamente" });
        }

        const token = jwt.sign({ usuarioId: usuario._id }, 'secreto', { expiresIn: '10h' });

        res.json({mensaje:"Hola, "+ usuario.nombre, token: token });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en la autenticación, intentanuevamente", error: error });
    }
});

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ mensaje: "Token no proporcionado" });
    }

    jwt.verify(token, 'encriptado', (error, decoded) => {
        if (error) {
            return res.status(401).json({ mensaje: "Token inválido", error: error });
        }
        req.usuario_id = decoded.usuario_id;
        next();
    });
}


 router.get("/recursos-protegidos", verificarToken, (req, res) => {
     res.json({ mensaje: "Acceso a recursos protegidos concedido" });
 });

//Guardar
router.post("/nuevo-usuario", async (req, res)=> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
   const nuevo= new usuarioSchema();
   nuevo._id=req.body._id
   nuevo.nombre=req.body.nombre
   nuevo.edad=req.body.edad
   nuevo.correo=req.body.correo
   nuevo.password=hashedPassword
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
router.put("usuario/:id", (req, res)=> {
    const{id}=req.params;
    const{nombre,edad,correo,password}=req.body;
     usuarioSchema
               .updateOne({_id:id},{$set:{nombre,edad,correo,password}})
               .then(data => {
                res.json({ mensaje: "Actualizado" });
                })
                .catch(error => {
                    res.status(500).json({ mensaje: "Error al guardar el producto", error: error });
                });    
 })

//eliminar
router.delete("usuario/:id", (req, res)=> {
    const{id}=req.params;
     usuarioSchema
               .remove({_id:id})
               .then(data => {
                res.json({ mensaje: "Eliminado" });
                })
                .catch(error => {
                    res.status(500).json({ mensaje: "Error al guardar el producto", error: error });
                });        
 })
 
module.exports=router;
