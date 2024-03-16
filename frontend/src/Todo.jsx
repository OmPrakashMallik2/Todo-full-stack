import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";

function Todo() {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleChange = (e) => {
        setNewTaskTitle(e.target.value);
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
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        displayTasks();
    }, [])

    return (
        <div className='flex flex-col items-center text-neutral-700'>
            <h1 className='text-5xl text-center text-white font-bold py-5'>Todo Web App🚀</h1>
            <form onSubmit={(e) => { e.preventDefault(); addTask(newTaskTitle) }} className='w-full md:w-2/3 lg:w-1/2 p-3 mb-2 rounded bg-white flex flex-col md:flex-row justify-between items-center'>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    placeholder='Type your task...'
                    className='py-3 px-4 mb-2 md:mb-0 w-full md:w-auto text-lg font-semibold outline-none focus:bg-white bg-neutral-200 rounded'
                />
                <button type='submit' className='text-lg bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded font-bold'>Add</button>
            </form>
            <div className='w-full md:w-2/3 lg:w-1/2'>
                {
                    tasks.map((task) => (
                        <div key={task.id} className='my-1 gap-2 flex items-center rounded'>
                            <p className={`py-3 px-4 w-full text-lg font-semibold rounded ${task.completed ? 'bg-green-300' : 'bg-white'}`}>{task.title} </p>
                            <button onClick={() => deleteTask(task.id)} className='text-xl bg-red-400 hover:bg-red-500 text-white  p-3 rounded-full font-bold'><RiDeleteBin6Line /></button>
                            <button onClick={() => doneTask(task.id)} className='text-xl bg-green-400 hover:bg-green-500 text-white  p-3 rounded-full font-bold'>< FaRegCheckCircle /></button>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default Todo;
