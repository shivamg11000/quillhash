import React, { Component } from "react";

import { withRouter } from 'react-router-dom';

import "./taskManager.scss";

class TaskManager extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSignout = this.onSignout.bind(this);
    }
    state = {
        newTaskInput: ''
    }
    onChange(e){  // for new task
        this.setState({newTaskInput: e.target.value});
    }
    onClick(){     // for new task
        if(!this.state.newTaskInput)    return;
        this.props.addTask({
            text: this.state.newTaskInput
        });
        this.setState({newTaskInput: ''});
    }
    onEdit(e, id){   // for editing existing task
        const li = e.target.parentNode;
        const editInput = li.querySelector('input[type="text"]');
        const label = li.querySelector('label');
        const containsClass = li.classList.contains("editMode");

        li.classList.toggle('editMode');

        if(containsClass){
            this.props.editTask({
                id,
                text: editInput.value 
            });
        }else{
            editInput.value = label.innerText;
        }
        
    }
    onSignout(){
        this.props.signout(() => this.props.history.push('/'));
    }
    render(){console.log('task', this.props);
        const { tasks, toggleTask, deleteTask} = this.props;
        const completeTasks = tasks.filter(task => task.completed);
        const inCompleteTasks = tasks.filter(task => !task.completed);

        return(
            <div>
                <div className="container task-manager">
                    <span className="logout" onClick={this.onSignout}>Logout</span>
                    <h2>TODO LIST</h2>
                    <h3>Add Item</h3>
                    <p>
                        <input id="new-task" name="add-task" type="text" value={this.state.newTaskInput} onChange={this.onChange}/><button name="add-task-btn" onClick={this.onClick}>Add</button>
                    </p>

                    <h3 id="tasks">Todo</h3>
                    <ul id="incomplete-tasks">
                        {
                            inCompleteTasks.map(task => 
                                <li key={task.id}>
                                    <input type="checkbox" name="check-task" onClick={() => toggleTask(task.id)}/><label>{task.text}</label>
                                    <input type="text" name="edit" /><button className="edit" name="edit-btn" onClick={(e) => this.onEdit(e, task.id)}>Edit</button>
                                    <button className="delete" name="delete" onClick={() => deleteTask(task.id)}>Delete</button>
                                </li>
                                )
                        }
                    </ul>

                    <h3>Completed</h3>
                    <ul id="completed-tasks">
                        {
                            completeTasks.map(task =>
                                <li key={task.id}>
                                    <input type="checkbox" name="uncheck-task" onClick={() => toggleTask(task.id)}/><label>{task.text}</label>
                                    <input type="text" name="edit" /><button name="edit-btn" className="edit" onClick={(e) => this.onEdit(e, task.id)}>Edit</button>
                                    <button className="delete" name="delete" onClick={() => deleteTask(task.id)}>Delete</button>
                                </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(TaskManager);