//const express = require('express');   CommonJS
import express from 'express'
import csrf from 'csurf'
import cookieParser  from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Crear la app
const app = express();

//Habilitar lectura de datos de formulario
app.use(express.urlencoded({extended: true}));

//Habilitar Cookie Parser

app.use( cookieParser() )





// Conexion a la db
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión Correcta a la Base de  Datos');
} catch(error) {
    console.log(error)
}

//Habilitar pug

app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta Pública
app.use( express.static('public'));


//Routing (endpoints)

app.use('/auth', usuarioRoutes);



//  Definir un puerto y arrancar el proyecto

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
}); 