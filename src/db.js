const uuid = require('uuid/v1');

const users = [
    {
        name: 'john',
        password: 'john'
    },
    {
        name: 'rambo',
        password: 'rambo'
    },
    {
        name: 'mohak',
        password: 'mohak'
    }
];

//  task object
//  {id, text, completed, userName}

const tasks = [{
    text: 'Do QuillHash assignment',
    completed: true
}, {
    text: "Go Back Home",
    completed: false
}, {
    text: "Buy Lunch",
    completed: false
}];

// create deafult tasks/todos for a user
const createDefaultTasksForUser = (tasks, userName) => {
    return tasks.map(task => ({
        ...task,
        id: uuid(),
        userName
    }))
}

// store default users to local storage
localStorage.setItem('users', JSON.stringify(users));

// store default tasks/todos to local storage 
const _tasks = users.map(user => createDefaultTasksForUser(tasks, user.name)).flat();
//console.log('db',_tasks);
localStorage.setItem('tasks', JSON.stringify(_tasks));

// get tasks by user name
const getTasksByUSerName = (userName) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks.filter(task => task.userName===userName);
}

// create new task for a user
const createTask = ({text, userName}) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = {
        id: uuid(),
        text,
        completed: false,
        userName
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const updateTask = ({text, id, completed}) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')).map(task => 
            task.id===id ?
                {...task, text, completed} :
                task
        );
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const deleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')).filter(task => task.id!==id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// authencticate user
const auth = (name, password) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const foundUser = users.find(user => user.name===name);
    if( foundUser && foundUser.password === password)
        return true;
    else   
        return false;    
}

export default {
    getTasksByUSerName,
    createTask,
    updateTask,
    deleteTask,
    auth
}