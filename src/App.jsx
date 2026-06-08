import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished=(e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {

    console.log(`the id is ${id}`)
    //  let index=todos.findIndex(item=>{
    //   return item.id === id;

    // })
    // let newTodos=[...todos]
    // delete newTodos[index]
    // setTodos(newTodos)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name

    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }



  return (
    <>
      <NavBar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 shadow-lg bg-violet-100 min-h-[80vh] lg:w-1/2 ">
      <h1 className='font-bold text-center text-3xl ' >iTask - Manage Your Todos </h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold' >Add New Todo</h2>

          {/* ADD BUTTON */}
          <input onChange={handleChange} name='add' value={todo} type="text" className='w-full bg-white rounded-full px-5 py-1' />
          <button onClick={handleAdd}  disabled={todo.length<3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-800 p-2 py-1 font-bold text-sm text-white rounded-md '>Save</button>


        </div>
 
<input className='my-4 ' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished

        <h2 className='text-lg font-bold' >Your Todos</h2>

        <div className="todos">
          {todos.length == 0 && <div className='m-5' >No Todos to display</div>}
          {todos.map((item) => {

            return (showFinished || !item.isCompleted) && (
              <div key={item.todo} className="todo flex md:w-1/2 my-3 justify-between ">

                <div className="flex gap-5" >

                  {/* CHECK LIST BUTTON */}
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex h-full ">

                  {/* //EDIT BUTTON */}
                  <button onClick={(e) => {
                    handleEdit(e, item.id)
                  }
                  } className='bg-blue-500 hover:bg-blue-600 p-2 py-1 font-bold text-sm text-white rounded-md mx-2'><FaEdit /></button>

                  {/* //DELETE BUTTON */}
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-red-500 hover:bg-red-600 p-2 py-1 font-bold text-sm text-white rounded-md mx-2'><MdDelete /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
