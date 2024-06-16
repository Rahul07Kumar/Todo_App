import { useEffect, useState, useSyncExternalStore } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from 'react-icons/ai';

function App() {
  const [todo , setTodo]= useState("")
  const [todos , setTodos]= useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  },[])


  const saveToLS = (params)=>{
    localStorage.setItem ("todos",JSON.stringify(todos))
    
  }

  const handleEdit =(e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(e=>{
      return e.id!=id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(e=>{
      return e.id!=id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleAdd= ()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted: false}])
    setTodo("")
    console.log(todos)
    saveToLS()
  }


  const handleChange= (e)=>{
    setTodo(e.target.value)
  }


  const handleCheckbox= (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  const toggleFinished = (e)=>{
    setShowFinished(!showFinished)
  }

  return (
    <>
    <Navbar/>
      <div className="md:container mx-2 md:mx-auto my-1 bg-violet-200 rounded-xl p-5 min-h-[85vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todos</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-md'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-300 hover:bg-violet-950 cursor-pointer text-white p-3 py-1 my-2 rounded-md w-full'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" name="" id="" checked={showFinished}/> Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'> No Todos to display </div> } 
          {todos.map(item=>{
            
            return (showFinished || !item.isCompleted) && <div key={item.id}className="todo flex md:w-3/4 justify-between my-2">
              <div className='flex gap-5'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""}> {item.todo} </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 cursor-pointer text-white p-2 py-1 rounded-md mx-1'><FaEdit/></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 cursor-pointer text-white p-2 py-1 rounded-md mx-1'><AiFillDelete/></button>
              </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
