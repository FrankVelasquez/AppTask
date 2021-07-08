//rutas o urls para que el Frontend acceda al server. Va a pedir, actualizar datos
// y otras operaciones mas
const express = require("express");
const router = express.Router();

//con esta constante Task lo asocio al modelo de la base de datos
const Task = require("../models/task");

//ruta asocida a /api/tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
   res.json(tasks);
});

//para obtener una tarea
router.get("/:id", async (req, res) => {
   const task= await Task.findById(req.params.id);
   res.json(task);
   
});

//para obtener una tarea
router.get("/find/:title", async (req, res) => {

  try {
        const task= await Task.find( {"title":{ $regex : req.params.title}})
        res.json(task);
  }catch(err){
    res.json({message:"Hubo un error"});
       
  }

});


router.post("/", async (req, res) => {
  const { title, description, responsible, priority } = req.body;

  const task = new Task({
    title,
    description,
    responsible, 
    priority
  });

  await task.save();
  console.log(task);
  res.json({ status: "Dato guardado" });
});

//Actualizar la tarea y recibe por  la ruta  id. 
router.put("/:id", async (req, res) => {
  const { title, description, responsible, priority } = req.body;
  const newTask = {
    title,
    description,
    responsible, 
    priority
  };
  
  await Task.findByIdAndUpdate(req.params.id, newTask);
  console.log(req.params.id);
  res.json({ status: "Tarea actualizada" });
});

//Eliminar la tarea y recibe por  la ruta  id.
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "Tarea Eliminada" });
});


module.exports = router;
