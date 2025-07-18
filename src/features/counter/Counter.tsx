import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../app/store'
import { decrement, increment } from './counterSlice'

export function Counter() {
  // ✅ TypeScript now knows what state looks like
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}
