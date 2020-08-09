import React from 'react';
import TodoList from './todo/TodoList';
import Context from './context';
import './App.css';
//import AddTodo from './todo/AddTodo';
import Modal from './Modal/modal'
import {useEffect} from 'react';
import Loader from './Loader'

// ленивая загрузка . указываем для комонента suspence
// Это правильный код:
//const AddTodo  =React.lazy(() => import('./todo/AddTodo'))

// Это код с имитацией задержки
const AddTodo  =React.lazy(() => new Promise(resolve => {
  setTimeout(() =>{
    resolve(import('./todo/AddTodo'));
  },2000)
}))

function App() {
  // используем юз стейт для управления стейтом
  const [todos, setTodos] = React.useState([]);
  const [loading,setLoading] = React.useState(true)

// загружаем контент с серверав
useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
  .then(response => response.json())
  .then(todos => {
    setTimeout(() => {
      setTodos(todos);
      setLoading(false)
    }, 2000);
    
  })
}, []);

// переключаем флаг completed
function toggleTodo(id){
  setTodos(todos.map(todo =>{
    if(todo.id === id){
      todo.completed = !todo.completed
    }
    return todo
  }))
}

// удаляем тудушку
function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))
}


// добавляем тудушку
function addTodo(title) { 
  setTodos(todos.concat([{
    title,
    id: Date.now(),
    completed:false 
  }]))

 }

  return (
    // используем контекст реакта для передачи метода от родителя любому компоненту напрямую
    <Context.Provider value={{removeTodo: removeTodo}}>
    <div className="App wrapper">
      <h1> Todo list:</h1>
      <Modal/>
      <React.Suspense fallback={<p> component loading... </p>}>
        <AddTodo onCreate={addTodo}/>
      </React.Suspense>
      
      {loading && <Loader/>}
        {todos.length
            ? <TodoList todos={todos} onToggle={toggleTodo} />
            : loading ? null: <p> to-do list is empty</p>
        }
    
    </div>
    </Context.Provider>
  );
}

export default App;
