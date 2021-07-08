# AppTask
Aplicación de gestión de tareas con login. 
Con esta App podras tener practicas  con los componentes de React, usando clases. 
Pongo en practica  el uso de variables de entornos, Json Web Token (JWT),
Aplicamos conocimientos de BOOTSTRAP 5.
En React, usamos la libreria react-router-dom asi como reacstrap.
En el Backend, ponemos  en practica algunas librerias tales como bcrypt, dotenv, jsonwebtoken, uuid necesarios 
para darle un toque de seguridad a nuestra sesión.
Usamos el Framework de express ya que facilita la tarea con nodejs.
Para conectarnos con la base de datos MONGODB usamos mongoose.
y el modelo de que usamos para nuestra base de datos es :
const TaskSchema =new Schema({
    title: { type: String},
    description : { type: String},
    responsible:  { type: String},
    priority:  { type: String}

});
facil para ptocesar nuestros datos. 
La finalidad de este proyecto es para que pongas en practica, diversos codigos
disponible en npm, el cual te sugiero echarte un paseo por su pagina web. 
