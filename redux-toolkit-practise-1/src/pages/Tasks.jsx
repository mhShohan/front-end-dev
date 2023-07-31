import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../store/reducers/taskSlice';

const Tasks = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    // const inputRef = useRef('');
    const { tasks } = useSelector((state) => state.tasks);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTask = {
            id: Date.now(),
            title: input,
        };

        dispatch(add(newTask));

        event.target.reset();
    };

    return (
        <div>
            <div className='task-form'>
                <h3>Add your Tasks</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='title'
                        // ref={inputRef}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type='submit'>Add Task</button>
                </form>
            </div>
            <ul className='tasks'>
                {tasks.length > 0 &&
                    tasks.map((task, i) => (
                        <li key={task.id} className='task'>
                            <span>
                                {i + 1}. {task.title}
                            </span>
                            <div>
                                {/* <button onClick={() => handleUpdate(task)}>
                                    Edit
                                </button> */}
                                <button
                                    onClick={() => dispatch(remove(task.id))}
                                >
                                    X
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Tasks;
