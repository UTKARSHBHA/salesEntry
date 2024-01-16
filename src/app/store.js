import { configureStore } from '@reduxjs/toolkit'
import salesSlice from '../features/sales/salesSlice'

export const store = configureStore({
  reducer: {
    sales: salesSlice
  },
})