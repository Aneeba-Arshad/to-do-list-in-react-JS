import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
function App() {

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const saveToLS=((params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
    
  }
  )

  const togglefinished =(e) => {
    setshowFinshed(!showFinshed)
  }
  

  const[todo, setTodo]=useState("")
  const[todos, setTodos]=useState([])

  const [showFinshed, setshowFinshed] = useState(true)


  const handleDelete=(e, id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleEdit=(e, id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleAdd=()=>{
       setTodos([...todos, { id:uuidv4(),todo,isCompleted:false}])
       setTodo("")
       saveToLS()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
}

const handleCheckbox=(e) => {
  let id=e.target.name;
  let index=todos.findIndex(item=>{
    return item.id===id;
  })
  let newTodos=[...todos];
  newTodos[index].isCompleted=!newTodos[index].isCompleted
  setTodos(newTodos)
  saveToLS()
}

  return (
    <>
    <Navbar/>
    
    <div className='mx-3 md:container md:w-1/2 my-5 md:mx-auto rounded-xl p-5 bg-violet-200 min-h-[80vh]'>
      <h1 className='font-bold text-center text-lg'>iTask - Manage your todos at one place</h1>
      <div className='addtodo my-5 flex flex-col'>
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type='text' className='w-full rounded-full px-3 py-1'></input>
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mt-2'>Save</button>
      </div>
      <input className='my-4' onChange={togglefinished} type='checkbox' checked={showFinshed}/> Show Finshed
        <h2 className='text-lg font-bold'>Your Todos</h2>
       <div className='todos'>

        {todos.length===0 && <div className='m-5'>No Todos To Display</div>}

       {todos.map(item=>{
        

        return  (showFinshed || !item.isCompleted) && <div key={item.id} className='todo flex justify-between md:w-1/2 py-3'>
          <div className='flex gap-5 '>
          <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted}/>
         <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
         </div>
          <div className='buttons flex h-full '>

          <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
          <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
          </div>
          
        </div>
        })}
       </div>
       
      </div>
    </>
  );
}
export default App;