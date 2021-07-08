
import React, { Component } from 'react'
import ls from 'local-storage';

class exit extends Component {
    
    componentDidMount() {
        const token = ls.get('jwt');
        if (token){
          ls.remove("jwt")
         this.props.history.push('/signin');
        }
      
      }
    
    render() {
        return (
               
                 <div className="">
                     <h1>redireccionando</h1>
                 </div>
               
        )
    }
}
export default exit;