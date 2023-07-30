import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../store/reducers/taskSlice';

const Tasks = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;

        const newTask = {
            id: Date.now(),
            title,
        };

        dispatch(add(newTask));

        event.target.reset();
    };

    return (
        <div>
            <div className='task-form'>
                <h3>Add your Tasks</h3>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='title' />
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
                            <button onClick={() => dispatch(remove(task.id))}>
                                X
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Tasks;
