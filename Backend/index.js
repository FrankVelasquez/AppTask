//para el uso de express nodejs para crear e inicializar el server
const express = require("express");
const app = express();
require('dotenv').config();
const morgan = require("morgan");
const path = require("path"); //unir directorios y rsolver el problema entre linux y windows
const cors = require('cors');
const jwt = require ('jsonwebtoken');

//con esta instruccion conectamos a la base de datos
const { mongoose } = require("./database");

//data 
const {HOST, PORT }=process.env;

//configuraciones cabeceras y cors
app.use( cors());


//middelwares de express
app.use(morgan("dev"));
app.use(express.json()); //para entender las dta en formato json

//rutas
app.use("/api/task", cors(), require("./routes/task.routes"));
app.use("/auth", cors(), require("./routes/auth"));


//archivos estaticos
app.use(express.static(path.join(__dirname, "../Frontend/public")));

//iniciando el server
app.listen(PORT, HOST, () => {
  console.log(`server active in http://${HOST}:${PORT}`);
});
