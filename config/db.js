//configuración de la base de datos
//llamando mongose
const mongoose=require('mongoose')
//URI con mongo
const db_uri='mongodb://localhost:27017/SENA-api';
//Conexión con mongo
module.exports= ()=>{
    //conexión
    const connect = ()=>{
        
        mongoose.connect(
                db_uri,
            {
                keepAlive:true,
                useNewUrlParser:true,
                useUnifiedTopology:true
            }, 
            (err) => {
                if(err){
                    console.log("Error en la conexión");
                }else{
                    console.log("Conexión correcta a bd"); 
                }
            }    
        )   
    }
    connect();
}  