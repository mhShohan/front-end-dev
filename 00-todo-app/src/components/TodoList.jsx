const TodoList = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <div>
      <h1 className='my-2 text-3xl text-center border-b-2'>Todo List</h1>
      {todos.length === 0 && (
        <h1 className='text-2xl text-red-500 text-center'>No Todo Found!</h1>
      )}
      {todos.length > 0 &&
        todos.map((todo) => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
    </div>
  );
};

export default TodoList;

const SingleTodo = ({ todo, deleteTodo, updateTodo }) => {
  return (
    <div className='border border-slate-500 my-1 py-1 px-5 rounded-md flex justify-between items-center'>
      <h1>{todo.title}</h1>
      <div>
        <button
          onClick={() => updateTodo(todo)}
          className='bg-green-400 py-1 px-4 m-1 rounded-md'
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className='bg-red-400 py-1 px-4 m-1 rounded-md'
        >
          X
        </button>
      </div>
    </div>
  );
};
