//Este es el archivo principal, es decir es el archivo que el servidor va a buscar
//llamando a express
const express= require('express')
//Para poder usar todos los beneficios o funciones de express
const app= express();
//configurando el servidor, puerto 5050
app.listen('1045',()=>{
    console.log("Open exitosamente, en el puerto 1045");
})
//rutas
const usuarioRuta=require("./public/MVC/Rutas/usuario");
const productoRuta=require("./public/MVC/Rutas/producto");
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//Esto obtiene un directorio lo cual quiere decir que todos mis archivos van estar dentro de la carpeta public tod lo de la pagina web
app.use(express.static(__dirname + '/public'))
//app.use(bodyParser.json({Type: "application/json"}))
//llamando la base de datos
const db= require('./config/db');
db();
app.use(usuarioRuta);
app.use(productoRuta);






