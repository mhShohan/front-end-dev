import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/reducers/userSlice';

function App() {
    const [id, setId] = useState(1);
    const dispatch = useDispatch();
    const { users: state } = useSelector((state) => state);

    console.log(state);

    useEffect(() => {
        dispatch(fetchUsers(id));
    }, [dispatch, id]);

    return (
        <div>
            {!state.isLoading && (
                <div className=''>
                    <h1>username: {state.users[0].name}</h1>
                    <button onClick={() => setId((p) => p + 1)}>
                        Increase
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
