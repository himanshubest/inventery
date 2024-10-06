import React, { Component } from 'react'
import Login from './login';



  export class _LoginLayout extends Component {
    
    render() {
      return (
        <div className="main-wrapper login-body">
          <div className="login-wrapper">
            <Login />
          </div>
          
        </div>
      );
    }
  }
  
  export default _LoginLayout;
  