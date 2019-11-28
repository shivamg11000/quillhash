import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./Components/privateRoute";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Login from "./Components/login";
import TaskManager from "./Components//taskManager";

import db from "./db.js";

const uuid = require('uuid/v1');


class App extends Component{
    constructor(props){
        super(props);
        this.addTask = this.addTask.bind(this);
        this.toggleTask = this.toggleTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.signout = this.signout.bind(this);
        this.populateTasks = this.populateTasks.bind(this);
    }
    state = {
        userName: undefined,
        isAuthenticated: false,
        tasks: []
    }
    populateTasks(){
        if(!this.state.userName)    return;
        const tasks = db.getTasksByUSerName(this.state.userName);
        this.setState({tasks});

    }
    authenticate({name, password}, success, failure){
        if(db.auth(name, password))   // if user exists in db
            this.setState({isAuthenticated: true, userName: name}, () => {
                success();
                this.populateTasks();
            });
        else   
            failure();        
    }
    signout(success){
        this.setState({isAuthenticated: false, userName: undefined}, () => success());
    }
    addTask({text}){
        db.createTask({text, userName: this.state.userName});
        this.populateTasks();
    }
    toggleTask(id){
        const task = this.state.tasks.find(t => t.id===id);
        db.updateTask({text: task.text, id, completed: !task.completed});
        this.populateTasks();
    }
    deleteTask(id){
        db.deleteTask(id);
        this.populateTasks();
    }
    editTask({id, text}){
        const task = this.state.tasks.find(t => t.id===id);
        db.updateTask({text, id, completed: task.completed});
        this.populateTasks();
    }
    render(){
        console.log(this.state.tasks)
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/'>
                            <Login authenticate={this.authenticate}/>
                        </Route>
                        <PrivateRoute path='/app' isAuthenticated={this.state.isAuthenticated}>
                            <TaskManager 
                                tasks={this.state.tasks}
                                addTask={this.addTask}
                                toggleTask={this.toggleTask}
                                deleteTask={this.deleteTask}
                                editTask={this.editTask}
                                signout={this.signout}
                                />
                        </PrivateRoute>
                    </Switch>        
                </BrowserRouter>        
            </div>
        );
    }   
}

export default App;
