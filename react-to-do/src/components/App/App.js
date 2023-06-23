import './App.css';
import React, {useEffect} from 'react';
import Todo from '../Todo/Todo';
import TodoForm from '../TodoForm/TodoForm';

function App() {
  const [todos, setTodos] = React.useState([]);
    async function fetchUsers () {
        const res = await fetch('http://localhost:3001/api/products?limit=10');
        const usersData = await res.json();

        setTodos(usersData.data);
    }

    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    async function deleteUser (id) {
        const res = await fetch(`http://localhost:3001/api/products/${id}`);

        setTodos()
    }

    useEffect(() => {
        fetchUsers()
    }, [])

  return (
      <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
              <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
              />
          ))}
            <TodoForm addTodo={addTodo} />
        </div>
      </div>
  );
}

export default App;
