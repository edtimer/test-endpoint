import React from 'react'
import { useSelector } from 'react-redux'
const Todos = () => {
  console.log("the state", useSelector(state => state))
  const todoList = useSelector(state => state.todoReducer.todos) || []
  console.log(todoList)
  return (
    <div>
      {todoList.map((singleTodo) => (
        <div className='card lg:card-side bg-base-100 shadow-xl p-4 m-2 min-w-full md:m-2'>
          <div className='card-body'>
          <h1 className='text-red-500 md:text-blue-500' key={singleTodo.id}>{singleTodo.text}</h1>
          </div>
        </div>
      ))}
  </div>
  )
}

export default Todos