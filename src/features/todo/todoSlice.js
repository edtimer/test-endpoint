import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos: []
}
export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = { id: nanoid(), text: action.payload, done: false }
            state.todos.push(todo)
        },
        getTodos: (state) => {
            return state.todos
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) =>
                todo.id !== action.payload
            )
        }
    }
})
export const { addTodo, getTodos, removeTodo } = todoSlice.actions
export default todoSlice.reducer