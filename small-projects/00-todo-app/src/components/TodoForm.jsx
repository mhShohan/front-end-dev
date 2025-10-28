import { useRef } from 'react';

const TodoForm = ({ addTodo }) => {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: inputRef.current.value,
    };
    if (inputRef.current.value.trim() === '') return;

    addTodo(newTodo);
    inputRef.current.value = '';
  };

  return (
    <form className='flex' onSubmit={handleSubmit}>
      <input
        type='text'
        required
        ref={inputRef}
        placeholder='Add Your Todo'
        className='border border-slate-400 p-2 rounded-md w-full'
      />
      <input type='submit' value='Add Todo' className='bg-blue-300 px-4' />
    </form>
  );
};

export default TodoForm;
