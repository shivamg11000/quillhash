import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Login extends Component{
    constructor(props){
        super(props);
        //this.history = useHistory();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    state = {
        name: '',
        password: ''
    }
    onChange(e){
        if (e.target.name==='name')
            this.setState({name: e.target.value});
        if (e.target.name==='password')
            this.setState({password: e.target.value});    
    }
    onSubmit(e){
        e.preventDefault();
        const { name, password } = this.state;
        if(!name)
            document.querySelector('.login input[type="text"]').classList.add('is-invalid')
        else    
            document.querySelector('.login input[type="text"]').classList.remove('is-invalid')
        if(!password)
            document.querySelector('.login input[type="password"]').classList.add('is-invalid')
        else    
            document.querySelector('.login input[type="password"]').classList.remove('is-invalid')   
        if(!name || !password)    return;
        this.props.authenticate({
            name,
            password
        }, () => this.props.history.push('/app'),
           () => document.querySelector('.login #msg').style.display = 'block');
    }
    render(){//console.log('log', this.props);

        const style={
            display: 'flex',
            height: '99vh',
            justifyContent: 'center',
            alignItems: 'center'
        }
        return(
            <div>
                
                <div className="container mt-2 login" >
                    <div className="row justify-content-center align-items-center text-center p-2" style={style}>
                        <div className="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white border rounded">
                            <div className="pt-5 pb-5">
                                <img className="rounded mx-auto d-block" src="https://freelogovector.net/wp-content/uploads/logo-images-13/microsoft-cortana-logo-vector-73233.png" alt="" width="70px" height="70px"/>
                                <p className="text-center text-uppercase mt-3">Login</p>

                                <div class="alert alert-danger" style={{display: 'none'}} id="msg" role="alert">
                                Credentials not matching
                                </div>
                                <form className="form text-center" action="#" method="POST" onSubmit={this.onSubmit}>
                                    <div className="form-group input-group-md">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" onChange={this.onChange} autoComplete="off"/>
                                        <div className="invalid-feedback text-left">
                                            Name needed
                                        </div> 
                                    </div>
                                    <div className="form-group input-group-md">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.onChange} autoComplete="off"/>
                                        <div className="invalid-feedback text-left">
                                            Password Needed
                                        </div> 
                                    </div>
                                    <button className="btn btn-lg btn-block btn-primary mt-4" type="submit" onClick={this.onSubmit}>
                                        Login
                                    </button>
                                    <a href="#" className="float-right mt-2">Forgot Password? </a>
                                </form>
                            </div>
                            <a href="#" className="text-center d-block mt-2">Create an account? </a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Login);