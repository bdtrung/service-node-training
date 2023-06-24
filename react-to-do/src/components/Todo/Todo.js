import React from 'react';


async function deleteUser (id) {
    await fetch(`http://localhost:3001/api/product/${id}`, {method: 'DELETE'});
}

function Todo({todo, index, completeTodo, removeTodo}) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.name}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => {
                    removeTodo(index);
                    deleteUser(todo.id)
                }}>x</button>
            </div>
        </div>
    );
};

export default Todo;