import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Todo() {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [tasks, setTasks] = useState([
        {
            id: 0,
            title: "Title",
            completed: false
        }
    ]);

    const handleChange = (e) => {
        const task = e.target.value;
        setNewTaskTitle(task);
    }

    const addTask = (taskTitle) => {
        axios
            .post("http://localhost:8080/task", { title: taskTitle })
            .then((res) => {
                console.log(res.data);
                displayTasks();
                setNewTaskTitle('')
            })
            .catch((err) => {
                console.error("Something went wrong:", err);
            })
    }


    const deleteTask = (taskId) => {
        axios
            .delete("http://localhost:8080/tasks/" + taskId)
            .then((res) => {
                displayTasks();
                // console.log("task deleted successfully");
            })
            .catch((err) => {
                console.error("problem is: " + err);
            })
    }

    const doneTask = (taskId) => {
        axios
            .put("http://localhost:8080/tasks/" + taskId)
            .then((res) => {
                displayTasks();
                // console.log(res.data);
            })
            .catch((err) => {
                console.error("problem is: " + err);
            })
    }

    const displayTasks = () => {
        axios
            .get("http://localhost:8080/tasks")
            .then((res) => {
                setTasks(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        displayTasks();
    }, [])

    return (
        <div>
            <h1 className='text-5xl text-center font-bold text-blue-500 py-5'>Todo full stack project🚀</h1>
            <form onSubmit={() => addTask(newTaskTitle)} className='bg-purple-500 p-5 flex items-center'>
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder='Type your task...'
                    className='p-4 w-80 text-lg outline-none rounded'
                />
                <button type='submit' className='text-xl bg-white ml-5 py-4 px-5 rounded font-bold'>Add</button>
            </form>
            {tasks.map((task) => (
                <div key={task.id} className='bg-purple-500 p-5 flex items-center'>
                    <p className={`p-4 w-80 text-lg text-purple-600 font-semibold rounded ${task.completed ? 'bg-green-200' : 'bg-neutral-400'}`}>{task.title} </p>
                    <button onClick={() => deleteTask(task.id)} className='text-xl bg-red-500 text-white ml-5 py-4 px-5 rounded font-bold'>Delete</button>
                    <button onClick={() => doneTask(task.id)} className='text-xl bg-green-500 text-white ml-5 py-4 px-5 rounded font-bold'>Check</button>
                </div>
            ))
            }
        </div >
    )
}

export default Todo
