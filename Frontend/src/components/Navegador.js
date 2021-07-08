import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Navbar, NavItem} from 'reactstrap'
import ls from 'local-storage';

class Navegador extends Component {
    state={
       search:'',
       auth:false
    }

 

   HandleSearch=(e)=>{
       e.preventDefault();
      
      this.props.onSearch(this.state.search);
      
   }    
 
   handleInputChange = (e) => {
    const { value, name } = e.target;
    const cad = value.toLowerCase();
    this.setState({
      [name]: cad,
    });
  }; 
  
  
    render() {
        return (
           
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            <div className="container">
                <button className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarTogglerDemo03" 
                    aria-controls="navbarTogglerDemo03" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon" />
                </button>
                
                <a className="navbar-brand" href="#">Gestor de Tareas</a>
                
                <div className="collapse navbar-collapse" 
                     id="navbarTogglerDemo03">
              
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"  >
                            
                            <NavItem className="nav-link"   
                                    style={{display: this.props.hiden ? 'none' : true }}>
                                <Link className="nav-link" 
                                      to='/'  >
                                Inicio
                                </Link>
                            </NavItem>

                            <NavItem className="nav-link" 
                                     style={{display: this.props.hiden ? 'none' : true }}>
                                <Link className="nav-link" 
                                      to='/signin' >
                                Login
                                </Link>
                            </NavItem>
                            <NavItem className="nav-link" 
                                    style={{display: this.props.hiden ? 'none' : true }}>
                                <Link className="nav-link" 
                                      to='/signup' >
                                Registrarse
                                </Link>
                            </NavItem>
                            <NavItem className="nav-link" 
                                    style={{display: this.props.hiden ? true: 'none'  }}>
                                <Link className="nav-link" 
                                      to={`/exit/${this.state.auth}`} >
                                Salida
                                </Link>
                            </NavItem>
                                                  
                        

                        </ul>
                        
                <form className="d-flex"  onSubmit={this.HandleSearch}>
                    <input className="form-control me-2" 
                           style={{display: this.props.hiden ? true : 'none' }}
                           type="search" 
                           placeholder="Indique tarea" 
                           aria-label="Search" 
                           name="search"
                           onChange={this.handleInputChange}/>
                    <button className="btn btn-outline-primary" 
                            type="submit"
                            style={{display: this.props.hiden ? true : 'none' }} 
                            >
                            Buscar
                    </button>
                </form>
                </div>
            </div>
            </nav>
          
          

        );
    }
}

export default Navegador;