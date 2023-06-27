import './App.css';
import React, {useEffect} from 'react';
import Todo from '../Todo/Todo';
import TodoForm from '../TodoForm/TodoForm';
import SimpleIndexTableExample from "../Table/Table";
import "@shopify/polaris/build/esm/styles.css";
import ResourceListWithSelectionExample from "../ResourceList/ResourceList";
import {
    AppProvider
} from '@shopify/polaris';
import HorizontalGridWithVaryingGapExample from "../LayoutGrid/LayoutGrid";

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

    const completeTodo = id => {
        const newTodos = [...todos];
        newTodos[id].isCompleted = true;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    useEffect(() => {
        fetchUsers()
    }, []);

  return (
<AppProvider>
      <div className="app">
        <div className="todo-list">
            {/*<SimpleIndexTableExample todos={todos}/>*/}
            <ResourceListWithSelectionExample todos={todos}/>
            <HorizontalGridWithVaryingGapExample>

            </HorizontalGridWithVaryingGapExample>
          {/*{todos.map((todo, index) => (*/}
          {/*    <Todo*/}
          {/*        key={index}*/}
          {/*        index={index}*/}
          {/*        todo={todo}*/}
          {/*        completeTodo={completeTodo}*/}
          {/*        removeTodo={removeTodo}*/}
          {/*    />*/}
          {/*))}*/}
          {/*  <TodoForm addTodo={addTodo} />*/}
        </div>

      </div>
    </AppProvider>
  );
}

export default App;
