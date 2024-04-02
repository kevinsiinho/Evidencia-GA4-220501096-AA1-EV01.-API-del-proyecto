const mongoose= require('mongoose')

const usuarioSchema = new mongoose.Schema(
    {
        "_id":{
            type: Number
        },
        "nombre":{
            type: String,
            required: true
        },
        "edad":{
            type: Number,
            required: true
        },
        "correo":{
            type: String,
            required: true
        },
        "password":{
            type: String,
            required: true
        },
        "fecha_creacion":{
            type:Date,
            default:Date.now(),
            require:false
        }
        
    }
)
//se exporta a otros codigos
module.exports = mongoose.model('usuario',usuarioSchema)
