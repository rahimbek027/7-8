import React, { useState } from 'react';
import { useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation } from './services/todos';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  const [todoText, setTodoText] = useState('');
  const { data: todos = [], refetch } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodo = async () => {
    if (todoText) {
      await createTodo({ title: todoText });
      setTodoText('');
      refetch();
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    refetch();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Todo List</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add a new todo"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleAddTodo} style={{ padding: '10px 20px' }}>Add Todo</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ padding: '5px 10px', color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
