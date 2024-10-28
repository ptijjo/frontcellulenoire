import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const Dispatch = useDispatch.withTypes<AppDispatch>()
export const Selector = useSelector.withTypes<RootState>()
export const Store = useStore.withTypes<AppStore>()