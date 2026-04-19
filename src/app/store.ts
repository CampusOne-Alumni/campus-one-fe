import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'
import alumniReducer from '../features/alumni/alumniSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    alumni: alumniReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
