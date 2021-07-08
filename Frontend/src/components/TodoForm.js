import React, { Component } from "react";

class TodoForm extends Component {
  state = {
    id: '',
    title:'',
    responsible: '',
    description: '',
    priority: ''
  };
 
  // debe retornar True para que componentDidUpdate se active
  shouldComponentUpdate() {
    return true
  }
  
  //este metodo lo hago con el fin de actualizar el state en cuanto cambie el prop
  componentDidUpdate(prevProps) { 
    // Uso tipico (no olvides de comparar las props):
    if (this.props._id !== prevProps._id) {
      this.setState({
        id:this.props._id,
        title: this.props.title,
        responsible: this.props.responsible,
        description: this.props.description,
        priority: this.props.priority

      });
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.onAddTodo(this.state.title,this.state.responsible,this.state.description,this.state.priority);

    this.setState({
      id: "",
      title: "",
      responsible: "",
      description: "",
      priority: "low"
    });
  };
  
 handleInputChange = (e) => {
    const { value, name } = e.target;
    const cad = value.toLowerCase();
    this.setState({
      [name]: cad,
    });
  };
  
 HandleVallue=()=>{
    if (this.props._id){
      return "Actualizar"
    }else{
      return "Guardar"
    }
 }

HandleErase=()=>{
  this.props.onErase();
}

 HandleClassName=()=>{
    if (this.props._id){
      return "btn btn-primary btn-warning mt-2 "
    }else{
      return "btn btn-primary btn-warning mt-2 disabled"
    }
 }

  render() {
    return (
      <div className="card bg-primary">
        
        
        
        <form onSubmit={this.handleSubmit} className="card-body">
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.handleInputChange}
              placeholder="Titulo"
            />
          </div>

          <div className="form-group mt-2">
            <input
              type="text"
              name="responsible"
              className="form-control"
              value={this.state.responsible}
              onChange={this.handleInputChange}
              placeholder="Responsable"
            />
          </div>

          <div className="form-group mt-2">
            <input
              type="text"
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={this.handleInputChange}
              placeholder="Descripción"
            />
          </div>
          <div className="form-group mt-2">
            <select
              name="priority"
              className="form-control"
              value={this.state.priority}
              onChange={this.handleInputChange}
            >
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>
           
           <div className="row mt-2">
          
              <button type="submit" className="btn btn-primary btn-darken4" >
              {this.HandleVallue()}
              </button>
              <button type="submit" 
                 className={this.HandleClassName()}
                 onClick={this.HandleErase} >
               Erase
              </button>
            </div>
       
        </form>
      </div>
    );
  }
}

export default TodoForm;
