const mongoose= require('mongoose')

const productoSchema = new mongoose.Schema(
    {
        "_id":{
            type: Number,
            required: true
        },
        "nombre":{
            type: String,
            required: true
        },
        "Categoria":{
            type: String,
            required: true
        },
        "valor":{
            type: Number,
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
module.exports = mongoose.model('producto',productoSchema)
