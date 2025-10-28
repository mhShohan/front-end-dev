import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Swal from 'sweetalert2';

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, todo]);
    Swal.fire({
      title: 'New Todo Added!',
      icon: 'success',
    });
  };

  const deleteTodo = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos((prev) => {
          const newState = prev.filter((todo) => todo.id !== id);
          return newState;
        });
        Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
      }
    });
  };

  const updateTodo = async (todo) => {
    const { value } = await Swal.fire({
      title: 'Update Your Todo',
      input: 'text',
      inputValue: todo.title,
    });

    setTodos((prev) => {
      const newState = prev.map((item) =>
        item.id === todo.id ? { ...todo, title: value } : item
      );
      return newState;
    });
    Swal.fire({
      title: 'Todo Updated!',
      icon: 'success',
    });
  };

  return (
    <div className='w-1/2 mx-auto border-2 border-slate-500 rounded-lg p-12 my-4'>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};

export default App;
