
import React, { Component } from "react";
import Imagen from "./Imagen";

class Imagenes extends Component {
  render() {
    const { tareas } = this.props;
    return (
      <>
        {tareas.map((tarea) => (
          <Imagen
            tarea={tarea}
            key={tarea._id}
            removeTodo={this.props.removeTodo}
            editTask={this.props.editTask}
          />
        ))}
      </>
    );
  }
}

export default Imagenes;
