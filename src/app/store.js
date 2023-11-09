import {configureStore} from'@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import user from '../features/user/userSlice'
import auth from '../app/authSlice'
export const store = configureStore({
    reducer:{
        todoReducer,
        auth,
        user
    },
})

