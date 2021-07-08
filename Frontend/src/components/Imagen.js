import React, { Component } from "react";
import PropTypes from "prop-types";

class Imagen extends Component {
  render() {
    const { tarea } = this.props;
    return (
      <div className="col-md-4">
        <div className="card mt-4">
          <div className="card-header text-center"> 
                <a href="#" 
                onClick={this.props.editTask.bind(this, tarea._id)}
                > {tarea.title} 
                </a>
          </div>

          <div className="card-title text-center">
            <h3 className="text-danger"> {tarea.priority} </h3>
            <span className="badge badge-pill badge-danger ml-2"></span>
          </div>
          <div className="card-body">
            <p>{tarea.description}</p>
            <p> {tarea.responsible}</p>
          </div>

          <div className="card-footer">
            <button
              className="btn btn-danger"
              onClick={this.props.removeTodo.bind(this, tarea._id, tarea.title)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Imagen.propTypes = {
  tarea: PropTypes.object.isRequired,
};

export default Imagen;
