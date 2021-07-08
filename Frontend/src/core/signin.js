import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navegador from '../components/Navegador';
import "../App.css";
import logo from "../logo.svg";
import ls from 'local-storage';
/* import {useParams} from 'react-router-dom'; */

class signin extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            email:'',
            password:'',
            auth:false,
            msg:""
        }
    }

    
    handleInputChange = (e) => {
        const { value, name } = e.target;
    
        this.setState({
          [name]: value,
        });
      };  

    goTo(){
       this.props.history.push('/');
    }

 
    handleSubmit = (e) => {
       e.preventDefault();
       const {email, password } =this.state;
      
       const user ={
             email,
             password
       } 
        
     
       if ( (email === "") || (password === "")) return null;
         
        
         const options = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
         }
        
         fetch("http://localhost:5000/auth/signin/", options)
            .then((res) => res.json())
            .then((data) => {
               //data.auth y data.token
                if (data.auth){
                    if (typeof(window) !== "undefined") {
                        ls.set("jwt", JSON.stringify(data.token));
                        this.setState({ auth: true });                    
                    }
                         
                    this.goTo();
                }else {

                    this.setState({ msg: "Sus credenciales no son correctas" })
                } 
                
                })  
            .catch((err) => {
                              this.setState({ msg: "Hubo un error desconocido" })  });
        

        
        this.setState({
            email:'',
            password:''
        });
      };      
   
    render() {
        return (
            <>
                <Navegador auth={this.state.auth} />
                    <div className="row p-4 mt-1 align-items-center justify-content-center vh-80">
                    
                      <div className="col-md-4 text-center">
                        <div className="card bg-primary ">
                            <div  className="card-header">
                            <img src={logo} className="App-logo2" alt="logo" /> 
                            <p className="text-white disabled">Inicie sesión</p>
                            </div>   
                            <form  className="card-body" onSubmit={this.handleSubmit} >
                        
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
                                            className="btn btn-warning mt-2 " >
                                            Iniciar sesión
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <div className="alert alert-danger mt-2" 
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

signin.propTypes = {

};

export default signin;