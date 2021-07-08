import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navegador from '../components/Navegador';
import "../App.css";
import logo from "../logo.svg";
import ls from 'local-storage';
class signup extends Component {
    constructor(props) {
        super(props);
        
        this.state={

            name:'',
            email:'',
            password:'',
            msg:"",
            typeAlert:""
        }
    
    }
    
    handleSubmit = (e) => {
       
        e.preventDefault();
       const { name, email, password } =this.state;
       
      
       
       if ( (name === "") || (email === "") || (password === "")) return null;
       
       const cad = email.toLowerCase();  
       const user ={
             name,
             email: cad,
             password
          }  
         const options = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
         }
        
         fetch("http://localhost:5000/auth/signup/", options)
            .then((res) => res.json())
            .then((data) => {
                /* if (typeof(window) !== "undefined") {
                      ls.set("jwt", JSON.stringify(data.token));
                   
                } */
                this.setState({ msg: "Usuario creado satisfactoriamente", 
                                typeAlert:"alert alert-success mt-2" })

            })
            .catch((err) => console.error(err));
        
      
        this.setState({
            name:'',
            email:'',
            password:''
        });
      };
    
    handleInputChange = (e) => {
        const { value, name } = e.target;
        
        this.setState({
          [name]: value,
        });
      };
  
    render() {
        return (
            <>
                <Navegador />
                <div className="row p-4 mt-2 align-items-center justify-content-center vh-80">
                 <div className="col-md-4 text-center">
                  <div className="card bg-primary ">
                    <div  className="card-header">
                            <img src={logo} className="App-logo2" alt="logo" /> 
                            <p className="text-white disabled">Inicie sesión</p>
                    </div>   
                    
                    <form  className="card-body" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nombre"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Correo electronico"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Indique contraseña"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        />
                    </div>
                                        
                    <div className="row mt-2">              
                        <button type="submit" 
                            className="btn btn-primary btn-warning mt-2 " >Registrarse
                        </button>
                    </div>
                    <div className="form-group">
                        <div className={this.state.typeAlert} 
                                style={{display: this.state.msg ? true: 'none'  }}>
                            <small> {this.state.msg} </small>
                                
                        </div>
                    </div>
                
                    </form>
                </div>
              </div>  
              </div>
            </>
        );
    }
}

signup.propTypes = {

};

export default signup;