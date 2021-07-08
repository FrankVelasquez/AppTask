import React, { Component } from "react";
import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ls from 'local-storage';

// data

// subcomponents
import TodoForm from "./components/TodoForm";
import Imagenes from "./components/Imagenes";
import Navegador from "./components/Navegador";

class App2 extends Component {
  state = {
    tareas: [],
    _id: "",
    title: "",
    responsible: "",
    description: "",
    priority: "low",
    hiden:false,
    auth:false,
    msg:"",
    typeAlert:""
  };

  //metodo para editar la data de la tarea
  editTask = (id) => {
    const token = ls.get('jwt');
    if (!token){
      this.props.history.push('/signin');
    }

    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:5000/api/task/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
         this.setState({
          _id: data._id,
          title: data.title,
          responsible: data.responsible,
          description: data.description,
          priority: data.priority
        });
      })
      .catch((err) => console.error(err));
  };

  //este metodo es para eliminar una tarea de la bd.
  removeTodo = (id, title) => {
   
    const token = ls.get('jwt');
    if (!token){
      this.props.history.push('/signin');
    }

    if (confirm(`Vas a eliminar la tarea ${title}, estas de acuerdo?`)) {
      const options = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      fetch(`http://localhost:5000/api/task/${id}`, options)
        .then((res) => res.json())
        .then((data) => {
    
           this.setState({
                _id: "",
                title: "",
                responsible: "",
                description: "",
                priority: "low",
                msg: "Eliminada con exito",
                typeAlert:  "alert alert-danger mt-2"

              });
          this.consultarApi();
        })
        .catch((err) => console.error(err));
    }
  };

  //consulta todos las tareas registradas en la base de datos
  consultarApi = () => {
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:5000/api/task", options)
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        //console.log(resultado);
        this.setState({ tareas: resultado });
      });
  };

  //Uso el metodo del ciclo de vida de la clase para cargar el metodo consultarApi
  //antes de renderizar
  componentDidMount() {
    const token = ls.get('jwt');
    if (token){
      this.setState({
        hiden:true
      })
      this.consultarApi();

    }else{
      this.props.history.push('/signin');
    }
  }

  //Agregamos la tareas
  handleAddTodo = (title, responsible, description, priority) => {
    const token = ls.get('jwt');
    if (!token){
      this.props.history.push('/signin');
    }
      //si contiene un dato en el state es porque se va a editar
    if (this.state._id) {
        
          const newTodo = {
            title,
            responsible,
            description,
            priority
          };
          const options = {
            method: "PUT",
            body: JSON.stringify(newTodo),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }       
          }

          fetch(`http://localhost:5000/api/task/${this.state._id}`, options)
          .then((res) => res.json())
          .then((data) => {
            
            this.consultarApi();
             this.setState({
                _id: "",
                title: "",
                responsible: "",
                description: "",
                priority: "low",
                msg: "Tarea editada satisfactoriamente",
                typeAlert:  "alert alert-warning mt-2"
              });
          })
          .catch((err) => console.error(err));
  
    } else {
      
      if (title === "") return null;
          const newTodo = {
            title,
            responsible,
            description,
            priority
          };
          const options = {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          };
          fetch("http://localhost:5000/api/task", options)
            .then((res) => res.json())
            .then((data) => {
                      this.consultarApi()
                       this.setState({
                          msg: "Tarea agregada satisfactoriamente",
                          typeAlert:  "alert alert-success mt-2"
                        });         
            })
            .catch((err) => console.error(err));
        }
  };

  onErase=()=>{
    
    if (this.state._id){ 
     this.setState({
                _id: "",
                title: "",
                responsible: "",
                description: "",
                priority: "low"
              });
    }          

  }
  
  HandleSearch=(search)=>{
    const token = ls.get('jwt');
    if (!token){
      this.props.history.push('/signin');
    }

    if (!search) {

      this.consultarApi()
    }else {
         
   
   const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
  fetch(`http://localhost:5000/api/task/find/${search}`, options)
        .then ((response) => response.json())
        .then ((data) => this.setState({tareas:data}))
           
        .catch((err) => console.error(err));
    }
  }
 
  onAuth=()=>{
    this.setState({ auth:false });
  }

  render() {
    // RETURN THE COMPONENT
    return (
      <div className="App">
        <Navegador 
           hiden = {this.state.hiden}
           badge={5} 
           onSearch={this.HandleSearch}/>
       
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <img src={logo} className="App-logo" alt="logo" />
                <div className="form-group">
                  <div className={this.state.typeAlert} 
                    style={{display: this.state.msg ? true: 'none'  }}>
                      <small> {this.state.msg} </small>
                          
                  </div>
              </div>
              <TodoForm
                onAddTodo={this.handleAddTodo}
                onErase={this.onErase}
                _id={this.state._id}
                description={this.state.description}
                priority={this.state.priority}
                responsible={this.state.responsible}
                title={this.state.title}
                msg ={this.state.msg}
                typeAlert= {this.state.typeAlert}
                
              />
            </div>

            <div className="col-md-8">
              <div className="row">
                <Imagenes
                  //todos={this.state.todos}
                  tareas={this.state.tareas}
                  removeTodo={this.removeTodo}
                  editTask={this.editTask}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App2;
