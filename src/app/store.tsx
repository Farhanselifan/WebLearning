import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

// ✅ Export type of RootState
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
