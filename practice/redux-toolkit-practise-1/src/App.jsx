import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/reducers/userSlice';
import { fetchTodos } from './store/reducers/todoSlice';

function App() {
    const [id, setId] = useState(1);
    const dispatch = useDispatch();
    const { users: state } = useSelector((state) => state);
    const { todos } = useSelector((state) => state);

    const handleClick = (status) => {
        if (status === 'Next') {
            setId((p) => {
                if (p === 10) return 1;
                return p + 1;
            });
        } else {
            setId((p) => {
                if (p === 1) return 10;
                return p - 1;
            });
        }
    };

    useEffect(() => {
        dispatch(fetchUsers(id));
        dispatch(fetchTodos(id));
    }, [dispatch, id]);

    return (
        <div>
            <div className='user'>
                <h1>User ID: {id}</h1>
                {state.isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <h2>Name: {!state.isLoading && state.users[0].name}</h2>
                )}
                <button onClick={() => handleClick('Prev')}>Prev</button>
                <button onClick={() => handleClick('Next')}>Next</button>
            </div>
            <ul className='todo-list'>
                {todos.isLoading && <h1>Loading...</h1>}
                {!todos.isLoading &&
                    todos.todos.map((todo) => (
                        <li key={todo.id}>
                            {todo.title} ---{' '}
                            {todo.completed ? 'Done' : 'Not Done yet'}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default App;
